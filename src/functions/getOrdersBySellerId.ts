import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { formatJSONResponse, JSONHTTPResponse } from "../helpers/JSONResponse";
import { APIGatewayProxyEvent } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

type RequestType = APIGatewayProxyEvent & { pathParameters: { sellerId: string; }; }

export const main = async (event: RequestType): Promise<JSONHTTPResponse> => {
  const result = await dynamoDb.query({
    TableName: "OrderTable",
    KeyConditionExpression: "sellerId = :sellerId",
    ExpressionAttributeValues: {
      ":sellerId": event.pathParameters.sellerId
    }
  }).promise();

  return formatJSONResponse(200, result.Items);
};