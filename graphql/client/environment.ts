import { useState } from "react";
import { loadQuery } from "react-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";
import { RelayAppPageProps, RelayPageProps } from "./types";

// SSRする場合に、シングルトンだと異なる利用者が同一の Environment (= キャッシュ) を参照してしまい事故が起きる
// これを防ぐため、サーバサイドでは毎回新しい Environment のインスタンスを作りつつ、クライアントサイドでは同じ Environment を参照できるようにする
function createEnvironment() {
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

// 呼び出し元がサーバなのかクライアントなのかを判断し、クライアントであれば同一のインスタンスを使い回す
export function getRelayEnvironment() {
  if (typeof window === "undefined") {
    return createEnvironment();
  }

  clientEnvironment ??= createEnvironment();
  return clientEnvironment;
}

export function releaseRelayEnvironment() {
  clientEnvironment = undefined;
}

function transformRelayProps<AppPageProps extends RelayAppPageProps>(
  environment: Environment,
  pageProps: AppPageProps
): RelayPageProps {
  // pageProps が relayDehydratedState を持たない場合(= CSR の場合)は、pageProps をそのまま返す
  if (!pageProps.relayDehydratedState) {
    return pageProps;
  }

  const {
    relayDehydratedState: { initialRecords, request },
    ...otherProps
  } = pageProps;
  // Environment（すなわち Relay のキャッシュ）にデータをセットしている
  environment.getStore().publish(new RecordSource(initialRecords));

  const { query, variables } = request;
  // props から受け取ったクエリの元情報から preloadedQuery を作成
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
