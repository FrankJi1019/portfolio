import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm"
import { GoogleAuth } from "google-auth-library"
import axios from "axios";

const ssmClient = new SSMClient({})

const VALID_RESUME_FILE_TYPE = [
    'application/vnd.google-apps.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf'
]

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

const handler = async () => {
    const credentialText = await getCredential()

    if (!credentialText) {
        return constructErrorObject(401, "Error: invalid google credential")
    }

    const credentials = JSON.parse(credentialText)

    const auth = new GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const { data: files } = await axios.get(
        `https://www.googleapis.com/drive/v3/files?fields=files(id,name,mimeType,parents)`,
        { headers: { Authorization: `Bearer ${token.token}` } },
    );

    const docFiles = files.files.filter(({ mimeType }: any) => {
        return VALID_RESUME_FILE_TYPE.includes(mimeType)
    })

    return {
        statusCode: 200,
        body: JSON.stringify(docFiles)
    }
}

export { handler }