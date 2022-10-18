import { loadQuery } from "react-relay";
import {
  ConcreteRequest,
  fetchQuery,
  GraphQLTaggedNode,
  OperationType,
} from "relay-runtime";
import { getRelayEnvironment } from "./environment";
import { RelayAppPageProps, RelayPageProps } from "./types";

export async function preloadQuery<Query extends OperationType>(
  query: ConcreteRequest | GraphQLTaggedNode,
  variables: Query["variables"]
): Promise<RelayPageProps<Query> | RelayAppPageProps> {
  const environment = getRelayEnvironment();

  if (typeof window !== "undefined") {
    const initialPreloadedQuery = loadQuery<Query>(
      environment,
      query,
      variables
    );
    return { initialPreloadedQuery };
  }

  await new Promise<void>((complete, error) => {
    fetchQuery(environment, query, variables).subscribe({ complete, error });
  });

  const initialRecords = environment.getStore().getSource().toJSON();

  const resultForApp: RelayAppPageProps = {
    relayDehydratedState: {
      initialRecords,
      request: { query, variables },
    },
  };

  return resultForApp;
}
