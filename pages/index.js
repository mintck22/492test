import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "@/component/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://in2o5ci219.execute-api.ap-southeast-1.amazonaws.com/human-counts/data",
      {
        method: "GET",
        headers: {
          // Add any headers you need, such as authentication headers
          // Example:
          // "Authorization": "Bearer yourAccessToken",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Calculate the difference between 121 and HumanCount
  const availableSeats = data ? 121 - data.HumanCount : "Loading...";

  return (
    <>
      <Head>
        <title>CMUL Check Seats 1st Floor</title>
      </Head>

      <Header />

      <div
        className={styles.border}
        style={{
          marginLeft: "10rem",
          marginRight: "10rem",
          marginTop: "1rem",
          padding: "2rem",
        }}
      >
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "blue" }}>
            1st Floor{" "}
          </span>
          <Link href="/secondF">
            <span
              className={styles.tab}
              style={{ fontSize: "20px", fontWeight: "bold" }}
            >
              2nd Floor
            </span>
          </Link>
        </div>

        <div style={{ textAlign: "center" }}>
          <Image src="/map1.jpg" width={500} height={333} />
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <span className={styles.tab}>จำนวนคนที่เข้าใช้บริการ</span>
          {data ? (
            <span className={styles.tab}>{data.HumanCount}</span>
          ) : (
            <span className={styles.tab}>Loading...</span>
          )}
          <span className={styles.tab}>คน</span>
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <span className={styles.tab}>จำนวนที่นั่งที่ว่าง</span>
          <span className={styles.tab}>{availableSeats}</span>
          <span className={styles.tab}>ที่นั่ง</span>
        </div>
      </div>
    </>
  );
}
