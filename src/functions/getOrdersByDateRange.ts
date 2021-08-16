import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import { formatJSONResponse, JSONHTTPResponse } from "../helpers/JSONResponse";
import { APIGatewayProxyEvent } from "aws-lambda";

const dynamoDb = new DynamoDB.DocumentClient();

type RequestType = APIGatewayProxyEvent & { queryStringParameters: { dateFrom: string; dateTo: string; }; }

export const main = async (event: RequestType): Promise<JSONHTTPResponse> => {
  const result = await dynamoDb.query({
    TableName: "OrderTable",
    IndexName: "DateCreatedIndex",
    KeyConditionExpression: "dateCreated BETWEEN :dateFrom AND :dateTo",
    ExpressionAttributeValues: {
      ":dateFrom": event.queryStringParameters.dateFrom,
      ":dateTo": event.queryStringParameters.dateTo
    }
  }).promise();

  return formatJSONResponse(200, result.Items);
};