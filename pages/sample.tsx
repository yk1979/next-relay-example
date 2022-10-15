import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import RelayEnvironment from "../graphql/client/environment";

import {
  graphql,
  loadQuery,
  PreloadedQuery,
  usePreloadedQuery,
} from "react-relay";
import { sampleQuery } from "../graphql/__generated__/relay/sampleQuery.graphql";
import { Suspense } from "react";

const query = graphql`
  query sampleQuery {
    hello
  }
`;

type Props = {
  preloadedQuery: PreloadedQuery<sampleQuery>;
};

const Sample: NextPage<Props> = ({ preloadedQuery }) => {
  const data = usePreloadedQuery<sampleQuery>(query, preloadedQuery);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Relay Suspense sample</h1>
        {data.hello}
      </main>
    </div>
  );
};

// TODO: suspense は _app.tsx に書きたい（Next.js 側がハンドリングしてしまって動かない？）
const SampleContainer: NextPage<Props> = (props) => {
  return (
    <Suspense fallback="loading...">
      <Sample {...props} />
    </Suspense>
  );
};

SampleContainer.getInitialProps = () => {
  const preloadedQuery = loadQuery<sampleQuery>(RelayEnvironment, query, {});
  return { preloadedQuery };
};

export default SampleContainer;
