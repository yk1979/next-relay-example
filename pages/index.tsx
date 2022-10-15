import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Next x Relay Example</h1>
      <Link href="./sample">got to suspense sample page</Link>
    </div>
  );
};

export default Home;
