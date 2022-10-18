import type { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { useRelayEnvironment } from "../graphql/client/environment";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { environment, transformedPageProps } = useRelayEnvironment(pageProps);
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Component {...transformedPageProps} />
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
