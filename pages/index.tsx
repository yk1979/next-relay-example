import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Suspense } from "react";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Next x Relay Example</h1>
      <Link href="./sample">got to suspense sample page</Link>
    </div>
  );
};

const HomeContainer: NextPage = () => {
  return (
    <Suspense fallback="loading...">
      <Home />
    </Suspense>
  );
};

export default HomeContainer;
