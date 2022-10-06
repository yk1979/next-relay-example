import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import RelayEnvironment from "../graphql/client/environment";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
