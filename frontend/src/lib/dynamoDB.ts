import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const getWebsiteData = async (userId: string) => {
    const command = new GetCommand({
        TableName: "WebsiteTable",
        Key: {
        CommonName: userId
        }
    });

    const response = await docClient.send(command);
    return response;
};

