# Serverless Example

## Description
Example AWS serverless project using Serverless Framework, DynamoDB, SQS and Lambda. Written in TypeScript.

### Project Layout
```
.
├── .eslintrc.yml                             - Configuration for linting TypeScript files
├── .mocharc.yml                              - Testing framework (Mocha) configuration
├── .nvmrc                                    - NVM config to specify NodeJS version to use
├── package.json
├── package-lock.json
├── README.md
├── serverless.yml
├── src                                       - Main project source folder
│   ├── functions                             - Lambda function source
│   │   ├── getOrderBySellerIdAndOrderId.ts
│   │   ├── getOrdersByDateRange.ts
│   │   ├── getOrdersBySellerId.ts
│   │   ├── postOrder.ts
│   │   └── processOrderWorker.ts
│   ├── helpers                               - utility functions
│   │   ├── handlerResolver.ts
│   │   ├── JSONResponse.ts
│   │   └── sqs.ts
│   ├── schema                                - APIGW Schemas
│   │   └── order.json
│   └── types                                 - Shared Types
│       └── order.ts
├── tests
│   ├── mock-data.json                        - JSON to help with testing manual API calls
│   └── mock.json                             - Request formatted JSON to help with local testing using serverless
├── tsconfig.json                             - config file for typescript
└── webpack.config.js
```

## Pre-reqs
As AWS Lambda only supports specific NodeJS runtimes I've opted for v14.
To install this version with NVM run `nvm install lts/fermium` and then `nvm use`.

NodeJS dependencies can then be installed with `npm install`

## Deploying
Any one of the following methods can be used to deploy:
 - `serverless deploy` if serverless is installed globally
 - `npm run deploy` to use my npm alias (executes locally installed serverless)
 - `npx serverless deploy` achieves the same as the above

## API Endpoints

| Method | Endpoint Path        | Params                               | Description                                          |
|--------|----------------------|--------------------------------------|------------------------------------------------------|
| POST   | /order               | Post Body: {OrderSchema}             | Webhook to submit an order                           |
| GET    | /order/{sellerId}    | QueryString Params: orderId          | Extract one order for a given orderId and sellerId   |
| GET    | /orders              | QueryString Params: fromDate, toDate | Extract all orders for a given date range            |
| GET    | /orders/{sellerId}   |                                      | Extract all orders for a given sellerId              |
