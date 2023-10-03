import { DynamoDB } from "aws-sdk";

export default async (req, res) => {
  try {
    // Initialize the AWS DynamoDB client
    const dynamoDB = new DynamoDB({ region: "ap-southeast-1" });

    // Get the ImageName parameter from the request query (assuming it's passed as a query parameter)
    const { imageName } = req.query;

    // Create parameters for the DynamoDB query
    const params = {
      TableName: "camera1", // Replace with your DynamoDB table name
      Key: {
        ImageName: { S: imageName }, // Use the provided imageName as the key
      },
    };

    // Perform the DynamoDB query
    const result = await dynamoDB.getItem(params).promise();

    // Check if the item exists
    if (!result.Item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Return the item data as JSON
    res.status(200).json(result.Item);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
