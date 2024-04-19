import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { fromContainerMetadata } from "@aws-sdk/credential-providers";

export async function generateStaticParams() {
  const dynamo = new DynamoDBClient({
    region: "us-west-2",
    credentials: fromContainerMetadata(),
  });
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
