import { useState } from "react";
import { loadQuery } from "react-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";
import { RelayAppPageProps, RelayPageProps } from "./types";

function createRelayEnvironment() {
  const network = Network.create(fetchGraphQL);
  const store = new Store(new RecordSource());
  const environment = new Environment({
    network,
    store,
    isServer: typeof window === "undefined",
  });
  return environment;
}

let clientEnvironment: Environment | undefined;

export function getRelayEnvironment() {
  if (typeof window === "undefined") {
    return createRelayEnvironment();
  }

  clientEnvironment ??= createRelayEnvironment();
  return clientEnvironment;
}

export function releaseRelayEnvironment() {
  clientEnvironment = undefined;
}

function transformRelayProps<AppPageProps extends RelayAppPageProps>(
  environment: Environment,
  pageProps: AppPageProps
): RelayPageProps {
  if (!pageProps.relayDehydratedState) {
    return pageProps;
  }

  const {
    relayDehydratedState: { initialRecords, request },
    ...otherProps
  } = pageProps;

  environment.getStore().publish(new RecordSource(initialRecords));

  const { query, variables } = request;
  const initialPreloadedQuery = loadQuery(environment, query, variables, {
    fetchPolicy: "store-only",
  });

  return { ...otherProps, initialPreloadedQuery };
}

export function useRelayEnvironment<AppPageProps extends RelayAppPageProps>(
  pageProps: AppPageProps
) {
  const [environment] = useState(getRelayEnvironment);
  const transformedPageProps = transformRelayProps(environment, pageProps);
  return { environment, transformedPageProps };
}
