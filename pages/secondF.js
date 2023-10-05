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
  const availableSeats2 = data2 ? 24 - data2.HumanCount : "Loading...";
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
      </Head>

      <Header />

      <div
        className={styles.border}
        style={{
          // width: "600px",
          // display: "inline-block",
          //textAlign: "center",
          marginLeft: "10rem",
          marginRight: "10rem",
          marginTop: "1rem",
          padding: "2rem",
        }}
      >
        {/* style={{ display: "inline-block", marginRight: "20px" }} */}
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <Link href="/">
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              1st Floor{" "}
            </span>
          </Link>

          <span
            className={styles.tab}
            style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }}
          >
            2nd Floor
          </span>
        </div>

        {/* <input type="text" id="seat" name="seat" onChange={handleChange} /> {seat}*/}

        <div style={{ textAlign: "center" }}>
          <h2 style={{ padding: "1rem" }}>Check Available Seats</h2>
          <Image src="/map2.jpg" width={500} height={333} />
          <div>
            <div
              className={styles.f2a}
              style={{
                backgroundColor: "grey",
                padding: "10px",
                width: "100px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2a}
              style={{
                backgroundColor: "grey",
                marginTop: "50px",
                padding: "10px",
                width: "100px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2a}
              style={{
                backgroundColor: "grey",
                marginTop: "100px",
                padding: "10px",
                width: "100px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2a}
              style={{
                backgroundColor: "grey",
                marginTop: "150px",
                padding: "10px",
                width: "100px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2a}
              style={{
                backgroundColor: "green",
                marginTop: "200px",
                padding: "10px",
                width: "100px",
              }}
            >
              {availableSeats3}/{camSeats3}
            </div>

            <div
              className={styles.f2b}
              style={{
                backgroundColor: "grey",
                marginTop: "200px",
                padding: "10px",
                width: "50px",
                height: "70px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2b}
              style={{
                backgroundColor: "orange",
                marginTop: "200px",
                marginLeft: "65px",
                padding: "5px",
                width: "50px",
                height: "70px",
              }}
            >
              {availableSeats}/{camSeats}
            </div>

            <div
              className={styles.f2c}
              style={{
                backgroundColor: "grey",
                padding: "10px",
                width: "90px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2c}
              style={{
                backgroundColor: "grey",
                marginTop: "50px",
                padding: "10px",
                width: "90px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2c}
              style={{
                backgroundColor: "grey",
                marginTop: "100px",
                padding: "10px",
                width: "90px",
              }}
            >
              -
            </div>
            <div
              className={styles.f2c}
              style={{
                backgroundColor: "green",
                marginTop: "150px",
                padding: "10px",
                width: "90px",
              }}
            >
              {availableSeats2}/{camSeats2}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <span>จำนวนคนที่เข้าใช้บริการ</span>
          <span className={styles.tab}>{totalHuman}</span>
          {/* <span className={styles.tab}>{data?.HumanCount?.N || "-"}</span>{" "}
          Display data.HumanCount.N if available */}
          <span className={styles.tab}>คน</span>
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <span>จำนวนที่นั่งที่ว่าง</span>
          <span className={styles.tab}> {totalSeats}</span>{" "}
          {/* Display data.HumanCount.N if available    50 - {data?.HumanCount?.N || "-"}*/}
          <span className={styles.tab}>ที่นั่ง</span>
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Graph />
        </div>
      </div>
    </>
  );
}
