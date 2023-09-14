import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function login() {
  return (
    <>
      <div>login</div>
      <div
        className={styles.border}
        style={{
          // width: "600px",
          // display: "inline-block",
          textAlign: "center",
          marginLeft: "2rem",
          marginRight: "2rem",
          marginTop: "1rem",
          padding: "2rem",
        }}
      >
        <Link href="/">
          <h3>1st Floor</h3>
        </Link>

        <Link href="/drawmap">
          <h3>draw map</h3>
        </Link>
      </div>
    </>
  );
}
