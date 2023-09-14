import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function fourthF() {
  return (
    <>
      <div>fourthF</div>
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

        <Link href="/secondF">
          <h3>2nd Floor</h3>
        </Link>

        <Link href="/thirdF">
          <h3>3rd Floor</h3>
        </Link>

        <h3>4th Floor</h3>
        {/* <Link href="/fourthF">
        
      </Link> */}
      </div>
    </>
  );
}
