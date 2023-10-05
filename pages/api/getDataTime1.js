// pages/api/getData.js

import AWS from "aws-sdk";

export default async function handler(req, res) {
  const lambda = new AWS.Lambda({ region: "ap-southeast-1" }); // Replace 'your-region' with your AWS region.

  try {
    // Invoke the Lambda function to get the processed data.
    const lambdaParams = {
      FunctionName: "GetDataTime1", // Replace with your Lambda function name.
      InvocationType: "RequestResponse",
    };

    const lambdaResponse = await lambda.invoke(lambdaParams).promise();

    if (lambdaResponse.StatusCode === 200) {
      const data = JSON.parse(lambdaResponse.Payload);
      res.status(200).json(data);
    } else {
      res
        .status(500)
        .json({ error: "Error fetching data from Lambda function" });
    }
  } catch (error) {
    console.error("Error invoking Lambda function:", error);
    res.status(500).json({ error: "Error fetching data from Lambda function" });
  }
}
