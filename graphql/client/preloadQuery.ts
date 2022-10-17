import { loadQuery } from "react-relay";
import {
  ConcreteRequest,
  fetchQuery,
  GraphQLTaggedNode,
  OperationType,
} from "relay-runtime";
import { getRelayEnvironment } from "./environment";
import { RelayAppPageProps, RelayPageProps } from "./types";

// この関数はクライアントサイドで実行された場合とサーバサイドで実行された場合とで返すものが変わる
export async function preloadQuery<Query extends OperationType>(
  query: ConcreteRequest | GraphQLTaggedNode,
  variables: Query["variables"]
): Promise<RelayPageProps<Query> | RelayAppPageProps> {
  const environment = getRelayEnvironment();

  // クライアントサイドで実行されたら、loadQuery で preloadedQuery を取得してそれを return する
  if (typeof window !== "undefined") {
    const initialPreloadedQuery = loadQuery<Query>(
      environment,
      query,
      variables
    );
    return { initialPreloadedQuery };
  }

  // サーバサイドで実行されたら fetchQuery を実行し、Relay のキャッシュにデータをセットする
  await new Promise<void>((complete, error) => {
    fetchQuery(environment, query, variables).subscribe({ complete, error });
  });
  // キャッシュにセットされたデータを InitialRecords として取得する
  const initialRecords = environment.getStore().getSource().toJSON();

  // App コンポーネント向けの props として、 relayDehydratedState フィールドに initialRecords をセットする
  const resultForApp: RelayAppPageProps = {
    relayDehydratedState: {
      initialRecords,
      request: { query, variables },
    },
  };

  return resultForApp;
}
