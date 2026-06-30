import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";

const S3_BUCKET_NAME = "portfolio-218448085940-ap-southeast-2-an";
const CONTENT_PREFIX = "content/";

const s3 = new S3Client({});

const handler = async () => {
  const listResponse = await s3.send(
    new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      Prefix: CONTENT_PREFIX,
    })
  );

  const objects = listResponse.Contents?.filter((obj) => obj.Key !== CONTENT_PREFIX) ?? [];

  const sections: Record<string, unknown> = {};

  await Promise.all(
    objects.map(async (obj) => {
      const key = obj.Key!;
      const sectionName = key.replace(CONTENT_PREFIX, "").replace(".json", "");

      const getResponse = await s3.send(
        new GetObjectCommand({
          Bucket: S3_BUCKET_NAME,
          Key: key,
        })
      );

      const body = await getResponse.Body?.transformToString();
      if (body) {
        sections[sectionName] = JSON.parse(body);
      }
    })
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sections),
  };
};

export { handler };
