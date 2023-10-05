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
    const params3 = {
      TableName: "camera3", // Replace with your DynamoDB table name
      ScanIndexForward: false, // Sort in descending order
      Limit: 1, // Limit the result to 1 item (the newest)
      ProjectionExpression: "HumanCount", // Specify the attributes you want (only HumanCount in this case)
      FilterExpression: "attribute_exists(UploadTime)", // Filter for items where UploadTime exists
    };

    // Use the scan operation to retrieve the newest item from DynamoDB
    const scanResult3 = await dynamoDB.scan(params3).promise();

    if (scanResult3.Items.length === 0) {
      // No items found
      return res.status(404).json({ message3: "No items found" });
    }

    const newestItem3 = scanResult3.Items[0];

    // Access the HumanCount attribute
    const humanCount3 = newestItem3.HumanCount;

    // Return the HumanCount as JSON
    res.status(200).json({ HumanCount: humanCount3 });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
