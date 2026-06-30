import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { GoogleAuth } from "google-auth-library"
import axios from "axios";

const ssmClient = new SSMClient({})
const s3 = new S3Client({})

const constructErrorObject = (statusCode: number, errorMessage: string) => {
    return {
        statusCode,
        body: JSON.stringify({
            msg: errorMessage
        })
    }
}

const getCredential = async () => {
    const response = await ssmClient.send(
        new GetParameterCommand({
            Name: "/portfolio/google-drive-credential",
            WithDecryption: true
        })
    )
    return response.Parameter?.Value
}

const handler = async (event: APIGatewayProxyEventV2) => {
    const credentialText = await getCredential()

    if (!credentialText) {
        return constructErrorObject(401, "Error: invalid google credential")
    }

    const credentials = JSON.parse(credentialText)

    const fileId = (JSON.parse(event.body || "{}")).fileId

    if (!fileId) {
        return constructErrorObject(400, "Missing 'fileId'")
    }

    const auth = new GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    })

    const client = await auth.getClient()
    const token = await client.getAccessToken()

    const pdfResponse = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${fileId}/export`,
        {
            headers: { Authorization: `Bearer ${token.token}` },
            params: { mimeType: "application/pdf" },
            responseType: "arraybuffer",
        },
    );

    const pdfBuffer = new Uint8Array(pdfResponse.data);

    await s3.send(
        new PutObjectCommand({
            Bucket: "portfolio-218448085940-ap-southeast-2-an",
            Key: "Frank-Ji-CV.pdf",
            Body: pdfBuffer,
            ContentType: "application/pdf",
        }),
    );

    return {
        statusCode: 201
    }

}

export { handler }
