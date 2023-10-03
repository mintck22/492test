import fs from "fs";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"

export function readHumanDB() {
  const str = fs.readFileSync("db/data.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(str);
  return data;
}

export function writeDataDB(data) {
  const str = JSON.stringify(data);
  fs.writeFileSync("db/data.json", str, { encoding: "utf-8" });
}

// const s3 = new S3Client({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.REGION,
// });

