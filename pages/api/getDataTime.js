import AWS from "aws-sdk";

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
      KeyConditionExpression: "attribute_exists(UploadTime)",
      ProjectionExpression: "HumanCount, UploadTime",
    };

    // Use the query operation to retrieve items from DynamoDB
    const queryResult = await dynamoDB.query(params).promise();

    if (queryResult.Items.length === 0) {
      // No items found
      return res.status(404).json({ message: "No items found" });
    }

    const items = queryResult.Items;

    // Calculate the hourly average from the fetched data
    const hourlyAverage = calculateHourlyAverage(items);

    // Return the hourly average as JSON
    res.status(200).json({ HourlyAverage: hourlyAverage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

function calculateHourlyAverage(items) {
  // Calculate the hourly average using the same logic as in your Lambda function
  const hourlyAverage = {};

  // Group items by hour
  items.forEach((item) => {
    const uploadTime = new Date(item.UploadTime);
    const hourKey = `${uploadTime.getFullYear()}-${
      uploadTime.getMonth() + 1
    }-${uploadTime.getDate()} ${uploadTime.getHours()}`;

    if (!hourlyAverage[hourKey]) {
      hourlyAverage[hourKey] = { total: 0, count: 0 };
    }

    hourlyAverage[hourKey].total += item.HumanCount;
    hourlyAverage[hourKey].count++;
  });

  // Calculate average per hour
  const result = {};
  for (const hourKey in hourlyAverage) {
    const { total, count } = hourlyAverage[hourKey];
    result[hourKey] = total / count;
  }

  return result;
  // Return the result as needed
  //   return hourlyAverage;
}
