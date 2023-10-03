import { DynamoDB } from "aws-sdk";

// Create a DynamoDB instance
const dynamoDB = new DynamoDB({ region: "ap-southeast-1" }); // Replace with your desired AWS region

// Define the DynamoDB table name
const tableName = "camera1"; // Replace with your DynamoDB table name

// Function to insert data into DynamoDB
export async function insertData(data) {
  try {
    // Create parameters for the DynamoDB putItem operation
    const params = {
      TableName: tableName,
      Item: {
        ImageName: { S: data.ImageName },
        HumanCount: { N: data.HumanCount.toString() },
        UploadTime: { S: data.UploadTime },
      },
    };

    // Perform the DynamoDB putItem operation
    await dynamoDB.putItem(params).promise();

    console.log("Data inserted into DynamoDB successfully");
  } catch (error) {
    console.error("Error inserting data into DynamoDB:", error);
    throw error;
  }
}
