import credentials from "../credential.json";
import { GoogleAuth } from "google-auth-library";
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

(async () => {
  const auth = new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const s3 = new S3Client({ region: "ap-southeast-2" });

  const { data: files } = await axios.get(
    `https://www.googleapis.com/drive/v3/files?fields=files(id,name,mimeType,parents)`,
    { headers: { Authorization: `Bearer ${token.token}` } },
  );

  const fileId = files.files.find(
    (file: any) => file.name === "Frank-Ji-CV",
  ).id;

  const pdfResponse = await axios.get(
    `https://www.googleapis.com/drive/v3/files/${fileId}/export`,
    {
      headers: { Authorization: `Bearer ${token.token}` },
      params: { mimeType: "application/pdf" },
      responseType: "arraybuffer",
    },
  );

  const pdfBuffer = new Uint8Array(pdfResponse.data);

  const res = await s3.send(
    new PutObjectCommand({
      Bucket: "portfolio-218448085940-ap-southeast-2-an",
      Key: "Frank-Ji-CV.pdf",
      Body: pdfBuffer,
      ContentType: "application/pdf",
    }),
  );

  console.log(res)
})();
