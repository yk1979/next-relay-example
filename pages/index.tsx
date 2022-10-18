import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Next x Relay Example</h1>
      <Link href="./sample">got to suspense sample page</Link>
    </div>
  );
};

export default Home;
