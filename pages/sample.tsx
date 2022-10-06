import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import RelayEnvironment from "../graphql/client/environment";

import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import { sampleQuery } from "../graphql/__generated__/relay/sampleQuery.graphql";
import { Suspense } from "react";

const query = graphql`
  query sampleQuery {
    hello
  }
`;
const preloadedQuery = loadQuery<sampleQuery>(RelayEnvironment, query, {});

const Sample: NextPage = () => {
  const data = usePreloadedQuery<sampleQuery>(query, preloadedQuery);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{data.hello}</h1>
      </main>
    </div>
  );
};

const SampleContainer: NextPage = () => {
  return (
    <Suspense fallback="loading...">
      <Sample />
    </Suspense>
  );
};

export default SampleContainer;
