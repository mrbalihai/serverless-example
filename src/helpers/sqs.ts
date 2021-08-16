import { SQS, AWSError } from "aws-sdk";
import { Context } from "aws-lambda";
import { PromiseResult } from "aws-sdk/lib/request";

const sqs = new SQS();

type SendMessageResult = Promise<PromiseResult<SQS.SendMessageResult, AWSError>>;

export const sendMessage = async (messageBody: string, messageAttributes = {}, queueName: string, context: Context): SendMessageResult => {
  const queueUrl = getQueueUrl(queueName, context);
  return await sqs
    .sendMessage({ QueueUrl: queueUrl, MessageBody: messageBody, MessageAttributes: messageAttributes })
    .promise();
};

// This may be a little bit brittle and could do with a better solution other than hacking at ARN strings
export const getQueueUrl = (queueName: string, context: Context): string => {
  const region = context.invokedFunctionArn.split(":")[3];
  const accountId = context.invokedFunctionArn.split(":")[4];
  const url = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
  return url;
};