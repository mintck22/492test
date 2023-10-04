import AWS from "aws-sdk";

// Initialize the AWS DynamoDB client
AWS.config.update({
  region: "ap-southeast-1", // Replace with your desired AWS region
  accessKeyId: "AKIA5MHKPM36GRLA7SYF", // Replace with your AWS access key
  secretAccessKey: "tzgx7Z/0EzRSarnPGIfBKCoEFCdedPYcMHqDSNA9", // Replace with your AWS secret key
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default async (req, res) => {
  try {
    // Define the DynamoDB parameters for the query
    const params = {
      TableName: "camera1", // Replace with your DynamoDB table name
      ScanIndexForward: false, // Sort in descending order
      Limit: 1, // Limit the result to 1 item (the newest)
      KeyConditionExpression: "attribute_exists(UploadTime)", // Ensure UploadTime exists
      ProjectionExpression: "ImageName, HumanCount, UploadTime", // Specify the attributes you want
    };

    // Use the query operation to retrieve the newest item from DynamoDB
    const queryResult = await dynamoDB.query(params).promise();

    if (queryResult.Items.length === 0) {
      // No items found
      return res.status(404).json({ message: "No items found" });
    }

    const newestItem = queryResult.Items[0];

    // Access the HumanCount attribute
    const humanCount = newestItem.HumanCount.N;

    // Convert it to a number if needed (it's currently a string)
    const humanCountNumber = parseInt(humanCount, 10);

    // Return the HumanCount as JSON
    res.status(200).json({ HumanCount: humanCountNumber });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
