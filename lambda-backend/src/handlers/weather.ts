import { APIGatewayProxyHandler } from "aws-lambda";
import https from "https";

export const healthCheck: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "Weather API backend is healthy." }),
  };
};

export const getCurrentWeather: APIGatewayProxyHandler = async (event) => {
  const city = event.queryStringParameters?.city || "Simpsonville";
  const apiKey = process.env.WEATHERAPI_KEY;

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    const currentWeatherData = await new Promise<string>((resolve, reject) => {
      https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }).on("error", reject);
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: currentWeatherData,
    };
  } catch (err) {
    console.error("Error fetching weather:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
};
