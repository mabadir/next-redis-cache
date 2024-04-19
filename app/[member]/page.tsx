import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export async function generateStaticParams() {
  const dynamo = new DynamoDBClient({ region: "us-east-2" });
  const cmd = new ScanCommand({ TableName: "build" });
  const response = await dynamo.send(cmd);
  return response?.Items?.map((item) => item.PK) ?? [];
}

export default async function Page({ params: { member } }) {
  return (
    <>
      <div>
        <span>{member}</span>
      </div>
    </>
  );
}
