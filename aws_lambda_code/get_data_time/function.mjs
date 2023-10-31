import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB({ region: "your_region" });
const documentClient = new AWS.DynamoDB.DocumentClient({ service: dynamodb });

exports.handler = async (event) => {
  try {
    // Fetch timestamped data from DynamoDB.
    const rawData = await fetchDataFromDynamoDB();

    // Calculate hourly averages from the rawData.
    const hourlyAverages = calculateHourlyAverages(rawData);

    return {
      statusCode: 200,
      body: JSON.stringify(hourlyAverages),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify("Error processing data: " + error.message),
    };
  }
};

async function fetchDataFromDynamoDB() {
  const params = {
    TableName: "your_table_name",
  };

  const result = await documentClient.scan(params).promise();

  // Extract and return the relevant data from the DynamoDB response.
  return result.Items.map((item) => ({
    timestamp: item.UploadTime, // Replace with your actual timestamp attribute name
    value: item.HumanCount, // Replace with your actual data attribute name
  }));
}

function calculateHourlyAverages(data) {
  const hourlyAverages = {};

  data.forEach((item) => {
    const timestamp = new Date(item.timestamp);
    const hour = timestamp.getUTCHours();

    if (!hourlyAverages[hour]) {
      hourlyAverages[hour] = {
        totalValue: 0,
        count: 0,
      };
    }

    hourlyAverages[hour].totalValue += item.value;
    hourlyAverages[hour].count++;
  });

  // Calculate the hourly averages and format the result.
  const result = [];
  for (const hour in hourlyAverages) {
    const average =
      hourlyAverages[hour].totalValue / hourlyAverages[hour].count;
    result.push({ hour: parseInt(hour), average });
  }

  return result;
}
