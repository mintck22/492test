import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "@/component/Header";
import { useEffect, useState } from "react";

export default function thirdF() {
  const [data, setData] = useState(null);

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

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Fetch data every 1 minute
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Calculate the difference between 121 and HumanCount
  const availableSeats = data ? 121 - data.HumanCount : "Loading...";

  return (
    <>
      <Head>
        <title>CMUL Check Seats 3rd Floor</title>
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

            <Link href="/secondF">
              <button
                type="button"
                className="btn btn-primary me-3"
                style={{ fontSize: "1rem", fontWeight: "bold" }}
              >
                2nd Floor
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-outline-primary"
              disabled
              style={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              3rd Floor
            </button>
          </div>

          <h2
            className="d-flex justify-content-center mx-auto"
            style={{ padding: "1rem" }}
          >
            Check Available Seats
          </h2>

          <div
            className="d-flex justify-content-center mx-auto"
            style={{ width: "700px" }}
          >
            <img className="img-fluid" src="/map1.jpg" />
          </div>

          <div
            className="d-flex justify-content-center mx-auto my-4"
            style={{ fontSize: "1.4rem" }}
          >
            <span className={styles.tab}>Number of people :</span>
            {data ? (
              <span className={styles.tab}>{data.HumanCount}</span>
            ) : (
              <span className={styles.tab}>Loading...</span>
            )}
            {/* <span className={styles.tab}>คน</span> */}
          </div>

          <div
            className="d-flex justify-content-center mx-auto my-2"
            style={{ fontSize: "1.4rem" }}
          >
            <span className={styles.tab}>Number of available seats :</span>
            <span className={styles.tab}>121</span>
            {/*availableSeats*/}
            {/* <span className={styles.tab}>ที่นั่ง</span> */}
          </div>
        </div>
      </div>
    </>
  );
}
