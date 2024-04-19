import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const dynamo = new DynamoDBClient({ region: "us-east-2" });
  const cmd = new ListTablesCommand({});
  const response = await dynamo.send(cmd);
  res.status(200).json({ message: JSON.stringify(response) });
}
