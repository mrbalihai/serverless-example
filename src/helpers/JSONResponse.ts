export type JSONHTTPResponse = { statusCode: number, body: string };

export const formatJSONResponse = <T>(statusCode: number, body: T): JSONHTTPResponse =>
  ({ statusCode, body: JSON.stringify(body) });