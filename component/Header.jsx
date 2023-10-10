import React from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div
        style={{
          // backgroundColor: "mediumpurple",
          padding: "0.3rem",
        }}
        className={styles.bg}
      >
        <img src="/cmu_logo.png" width={80} className="p-2 ms-2" />
        <span
          style={{
            marginLeft: "1rem",
            fontSize: "2rem",
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
