import "source-map-support/register";
import { SQSEvent } from "aws-lambda";
import { DynamoDB, AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import type { Order } from "../types/order";

type PutItemOutput = DynamoDB.DocumentClient.PutItemOutput;
type PutItemResult = Promise<PromiseResult<PutItemOutput, AWSError>>;

const dynamoDb = new DynamoDB.DocumentClient();

const putOrder = async (data: Order): PutItemResult =>
  await dynamoDb.put({ TableName: "OrderTable", Item: data })
    .promise();

export const main = async (event: SQSEvent): Promise<void> => {
  for (const r of event.Records)
    await putOrder(JSON.parse(r.body) as Order);
};
