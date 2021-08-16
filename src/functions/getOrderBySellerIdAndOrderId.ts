import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { formatJSONResponse, JSONHTTPResponse } from "../helpers/JSONResponse";
import { APIGatewayProxyEvent } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

type RequestType = APIGatewayProxyEvent & { pathParameters: { sellerId: string }, queryStringParameters: { orderId: string; }; }

export const main = async (event: RequestType): Promise<JSONHTTPResponse> => {
  const result = await dynamoDb.get({
    TableName: "OrderTable",
    Key: {
      "sellerId": event.pathParameters.sellerId,
      "orderId": event.queryStringParameters.orderId
    }
  }).promise();

  return formatJSONResponse(200, result.Item);
};