import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function Graph() {
  const [getData, setGetData] = useState([]);

  const fetchDataTime = () => {
    fetch("/api/getDataTime1", {
      method: "GET",
      headers: {
        // Add any headers you need, such as authentication headers
        // Example:
        // "Authorization": "Bearer yourAccessToken",
      },
    })
      .then((response) => response.json())
      .then((result) => setGetData(result))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    // Fetch data initially
    fetchDataTime();
  }, []);

  //   const labels = 0; // getData.map((item) => item.label);
  //   const values = 0; //getData.map((item) => item.value);

  //   const human = getData ? 0 + getData.HourlyAverage : "Loading...";

  //   const chartData = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "1st Floor zone A-5",
  //         data: values,
  //         fill: false,
  //         borderColor: "rgb(75, 192, 192)", // Line color
  //         tension: 0.1, // Line tension (0.1 for sharp lines)
  //       },
  //     ],
  //   };

  //   const chartOptions = {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   };

  return (
    <>
      <h2>Graph</h2>
      {/* <Chart data={chartData} options={chartOptions} /> */}
      <ul>
        {Object.keys(getData).map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
}
