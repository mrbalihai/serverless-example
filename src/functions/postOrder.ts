import "source-map-support/register";
import { sendMessage } from "../helpers/sqs";
import { formatJSONResponse } from "../helpers/JSONResponse";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { JSONHTTPResponse } from "../helpers/JSONResponse";

const orderQueueName = "OrderQueue";
const successMessage = "Order has been received succesfully";

export const main = async (event: APIGatewayProxyEvent, context: Context): Promise<JSONHTTPResponse> => {
  await sendMessage(event.body, {}, orderQueueName, context);
  return formatJSONResponse(200, { message:  successMessage });
};