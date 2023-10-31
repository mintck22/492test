import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB({ region: "your_region" });
const documentClient = new AWS.DynamoDB.DocumentClient({ service: dynamoDB });

export const handler = async (event) => {
  try {
    for (const record of event.Records) {
      if (record.eventName === "INSERT") {
        // New record added to DynamoDB, fetch the latest HumanCount
        const params = {
          TableName: "camera2",
          ScanIndexForward: false,
          Limit: 1,
          KeyConditionExpression: "attribute_exists(UploadTime)",
          ProjectionExpression: "HumanCount",
        };

        const queryResult = await documentClient.query(params).promise();

        if (queryResult.Items.length === 0) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: "No items found" }),
          };
        }

        const newestItem = queryResult.Items[0];

        // Access the HumanCount attribute
        const humanCount = newestItem.HumanCount.N;

        // Convert it to a number if needed (it's currently a string)
        const humanCountNumber = parseInt(humanCount, 10);

        // Calculate the available seats
        const totalSeats = 121; // Replace with your total number of seats
        const availableSeats = totalSeats - humanCountNumber;

        // Return only the HumanCount and availableSeats as JSON
        return {
          statusCode: 200,
          body: JSON.stringify({
            HumanCount: humanCountNumber,
            HumanCount2: humanCountNumber2,
            AvailableSeats: availableSeats,
          }),
        };
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "No relevant event" }),
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
