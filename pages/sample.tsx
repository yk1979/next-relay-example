import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import { Suspense } from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import { preloadQuery } from "../graphql/client/preloadQuery";
import { RelayAppPageProps } from "../graphql/client/types";
import { sampleQuery } from "../graphql/__generated__/relay/sampleQuery.graphql";
import { useDispose } from "../graphql/client/dispose";

const query = graphql`
  query sampleQuery {
    hello
  }
`;

type PageProps = {
  initialPreloadedQuery: PreloadedQuery<sampleQuery>;
};
type InitialProps = PageProps | RelayAppPageProps;

const Sample: NextPage<PageProps, InitialProps> = ({
  initialPreloadedQuery,
}) => {
  const data = usePreloadedQuery<sampleQuery>(query, initialPreloadedQuery);
  useDispose(initialPreloadedQuery);
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
const SampleContainer: NextPage<PageProps, InitialProps> = (props) => {
  return (
    <Suspense fallback="loading...">
      <Sample {...props} />
    </Suspense>
  );
};

SampleContainer.getInitialProps = () => {
  return preloadQuery<sampleQuery>(query, {});
};

export default SampleContainer;
