import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "@/component/Header";
import axios from "axios"; // Import axios or your preferred HTTP library
import Graph from "@/component/Graph";

export default function secondF() {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);

  // const [getData, setGetData] = useState(null);

  const fetchData = () => {
    fetch("/api/dynamodb", {
      method: "GET",
      headers: {
        // Add any headers you need, such as authentication headers
        // Example:
        // "Authorization": "Bearer yourAccessToken",
      },
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error:", error));
  };

  const fetchData2 = () => {
    fetch("/api/dynamodb2", {
      method: "GET",
      headers: {
        // Add any headers you need, such as authentication headers
        // Example:
        // "Authorization": "Bearer yourAccessToken",
      },
    })
      .then((response) => response.json())
      .then((result) => setData2(result))
      .catch((error) => console.error("Error:", error));
  };

  const fetchData3 = () => {
    fetch("/api/dynamodb3", {
      method: "GET",
      headers: {
        // Add any headers you need, such as authentication headers
        // Example:
        // "Authorization": "Bearer yourAccessToken",
      },
    })
      .then((response) => response.json())
      .then((result) => setData3(result))
      .catch((error) => console.error("Error:", error));
  };

  // const fetchDataTime = () => {
  //   fetch("/api/getDataTime", {
  //     method: "GET",
  //     headers: {
  //       // Add any headers you need, such as authentication headers
  //       // Example:
  //       // "Authorization": "Bearer yourAccessToken",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => setGetData(result))
  //     .catch((error) => console.error("Error:", error));
  // };

  useEffect(() => {
    // Fetch data initially
    fetchData();
    fetchData2();
    fetchData3();
    // fetchDataTime();

    // Fetch data every 1 minute
    const intervalId = setInterval(() => {
      fetchData();
      fetchData2();
      fetchData3();
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Calculate the difference between Seats in camera and HumanCount
  const camSeats = 20;
  const camSeats2 = 24;
  const camSeats3 = 12;

  const availableSeats = data ? camSeats - data.HumanCount : "Loading...";
  const availableSeats2 = data2 ? camSeats2 - data2.HumanCount : "Loading...";
  const availableSeats3 = data3 ? camSeats3 - data3.HumanCount : "Loading...";

  const human = data ? 0 + data.HumanCount : "Loading...";
  const human2 = data2 ? 0 + data2.HumanCount : "Loading...";
  const human3 = data3 ? 0 + data3.HumanCount : "Loading...";

  const totalHuman = human + human2 + human3;
  const totalSeats = availableSeats + availableSeats2 + availableSeats3;

  return (
    <>
      <Head>
        <title>CMUL Check Seats 2nd Floor</title>
        <link rel="icon" href="/cmu_logo.png" />
      </Head>

      <Header />

      <div className="d-flex justify-content-center p-3">
        <div
          className={styles.border}
          style={{
            width: "1000px",
            padding: "2rem",
          }}
        >
          <div
            className="d-grid gap-2 d-md-block"
            style={{ padding: "2rem", textAlign: "center" }}
          >
            <Link href="/">
              <button
                type="button"
                className="btn btn-primary me-3"
                style={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                1st Floor
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-outline-primary me-3"
              disabled
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              2nd Floor
            </button>

            <Link href="/thirdF">
              <button
                type="button"
                className="btn btn-primary"
                style={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                3rd Floor
              </button>
            </Link>
          </div>

          <h2
            className="d-flex justify-content-center mx-auto"
            style={{ padding: "1rem" }}
          >
            Check Available Seats
          </h2>
          {/* <input type="text" id="seat" name="seat" onChange={handleChange} /> {seat}textAlign: "center"*/}

          <div
            className="d-flex justify-content-center mx-auto"
            style={{ width: "700px" }}
          >
            <div className={styles.buttonOverlay}>
              <img className="img-fluid" src="/map2.jpg" />
              <button
                type="button"
                className="btn btn-dark p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "3rem",
                  fontSize: "2rem",
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-dark p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "8rem",
                  fontSize: "2rem",
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-dark p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "13rem",
                  fontSize: "2rem",
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-success p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "18rem",
                  fontSize: "2rem",
                }}
              >
                {availableSeats3}
              </button>

              {/* zone B */}
              <button
                type="button"
                className="btn btn-dark p-2"
                style={{
                  width: "4rem",
                  height: "5rem",
                  marginLeft: "14rem",
                  fontSize: "2rem",
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-warning p-2"
                style={{
                  width: "4rem",
                  height: "5rem",
                  marginLeft: "19rem",
                  fontSize: "2rem",
                }}
              >
                {availableSeats}
              </button>

              {/* zone C */}
              <button
                type="button"
                className="btn btn-dark p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "8rem",
                  marginLeft: "29.2rem",
                  fontSize: "2rem",
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-dark p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "13rem",
                  marginLeft: "29.2rem",
                  fontSize: "2rem",
                }}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-success p-2"
                style={{
                  width: "8rem",
                  height: "4rem",
                  marginTop: "18rem",
                  marginLeft: "29.2rem",
                  fontSize: "2rem",
                }}
              >
                {availableSeats2}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center mx-auto my-4">
            <span style={{ fontSize: "1.4rem" }}>Number of people :</span>
            <span className={styles.tab} style={{ fontSize: "1.4rem" }}>
              {totalHuman}
            </span>
            {/* <span className={styles.tab}>{data?.HumanCount?.N || "-"}</span>{" "}
          Display data.HumanCount.N if available */}
            {/* <span className={styles.tab}>people</span> */}
          </div>

          <div className="d-flex justify-content-center mx-auto my-2">
            <span style={{ fontSize: "1.4rem" }}>
              Number of available seats :
            </span>
            <span className={styles.tab} style={{ fontSize: "1.4rem" }}>
              {totalSeats}
            </span>
            {/* Display data.HumanCount.N if available    50 - {data?.HumanCount?.N || "-"}*/}
            {/* <span className={styles.tab}>ที่นั่ง</span> */}
          </div>

          {/* <div style={{ textAlign: "center", padding: "1rem" }}>
          <Graph />
        </div> */}
        </div>
      </div>
    </>
  );
}
