import AWS from "aws-sdk";

// Initialize the AWS DynamoDB client
AWS.config.update({
  region: "ap-southeast-1", // Replace with your desired AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY, // Replace with your AWS access key
  secretAccessKey: process.env.AWS_SECRET_KEY, // Replace with your AWS secret key
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default async (req, res) => {
  try {
    // Get the ImageName parameter from the request query (assuming it's passed as a query parameter)
    const { imageName } = req.query;

    // Create parameters for the DynamoDB query
    const params = {
      TableName: "camera1", // Replace with your DynamoDB table name
      Key: {
        ImageName: imageName, // Use the provided imageName as the key
      },
    };

    // Perform the DynamoDB query
    const result = await dynamoDB.get(params).promise();

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
