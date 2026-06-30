import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"

const S3_BUCKET_NAME = 'portfolio-218448085940-ap-southeast-2-an'

const s3 = new S3Client({})

const getSectionContent = async (sectionName: string) => {
    const response = await s3.send(
        new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: `content/${sectionName}.json`
        })
    )
    const body = await response.Body?.transformToString()
    return JSON.parse(body)
}

const updateSectionContent = async (sectionName: string, newContent: Object) => {
    await s3.send(
        new PutObjectCommand({
            Bucket:S3_BUCKET_NAME,
            Key: `content/${sectionName}.json`,
            Body: JSON.stringify(newContent),
            ContentType: 'application/json'
        })
    )
}

const handler = async (event: APIGatewayProxyEventV2) => {

    const method = event.requestContext.http.method.toUpperCase()

    const section = event.pathParameters?.section

    if (!section) {
        return {
            statusCode: 400,
            body: JSON.stringify({ msg: "Error: invalid path parameter" })
        }
    }

    if (method === 'GET') {
        try {
            return await getSectionContent(section)
        } catch (e) {
            return {
                statusCode: 400,
                body: JSON.stringify({ msg: `Error: section "${section}" is not found` })
            }
        }

    } else if (method === 'PUT' || method === 'PATCH') {
        const body = JSON.parse(event.body || "{}")
        try {
            await updateSectionContent(section, body)
            return {
                statusCode: '201'
            }
        } catch (e) {
            return {
                statusCode: '400',
                body: JSON.stringify({ msg: `Error: unable to update section "${section}"` })
            }
        }


    } else {
        return {
            statusCode: 400,
            body: `Unsupported method: ${method}`
        }
    }

}

export { handler }
