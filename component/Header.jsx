import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div
        style={{
          // backgroundColor: "mediumpurple",
          padding: "0.8rem",
        }}
        className={styles.bg}
      >
        <span
          style={{
            marginLeft: "50px",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Chiang Mai University Library
        </span>
        {/* <Link href="/login">
          <span style={{ marginLeft: "900px" }}>Staff login</span>
        </Link> */}
      </div>
    </div>
  );
}
