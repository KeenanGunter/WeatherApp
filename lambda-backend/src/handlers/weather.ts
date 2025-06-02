import { APIGatewayProxyHandler } from "aws-lambda";

export const test: APIGatewayProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "Initial Weather API call!" }),
  };
};
