import type { NextPage } from "next";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";

import { useDispose } from "../graphql/client/dispose";
import { preloadQuery } from "../graphql/client/preloadQuery";
import { RelayAppPageProps } from "../graphql/client/types";
import { sampleQuery } from "../graphql/__generated__/relay/sampleQuery.graphql";
import styles from "../styles/Home.module.css";

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

Sample.getInitialProps = () => {
  return preloadQuery<sampleQuery>(query, {});
};

// next/link による Transition を活用する
export default Sample;

// Suspense によるフォールバックを有効にしたい場合はこちらを使う
// export default wrapSuspense(Sample);
