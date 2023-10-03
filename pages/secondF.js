import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "@/component/Header";

export default function secondF() {
  const [seat, setSeat] = useState("");
  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setSeat(event.target.value);
  };

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
          <Image src="/map2.jpg" width={500} height={333} />
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
              backgroundColor: "orange",
              marginTop: "100px",
              padding: "10px",
              width: "100px",
            }}
          >
            8
          </div>
          <div
            className={styles.f2a}
            style={{
              backgroundColor: "red",
              marginTop: "150px",
              padding: "10px",
              width: "100px",
            }}
          >
            3
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
            15
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
            15
          </div>
          {/* <div className={styles.f2b}>28</div> */}
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <span className={styles.tab}>จำนวนคนที่เข้าใช้บริการ</span>
          <span className={styles.tab}>0</span>
          <span className={styles.tab}>คน</span>
        </div>

        <div style={{ textAlign: "center", padding: "1rem" }}>
          <span className={styles.tab}>จำนวนที่นั่งที่ว่าง</span>
          <span className={styles.tab}>0</span>
          <span className={styles.tab}>ที่นั่ง</span>
        </div>
      </div>
    </>
  );
}
