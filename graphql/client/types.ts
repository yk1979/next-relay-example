import { PreloadedQuery } from "react-relay";
import {
  ConcreteRequest,
  GraphQLTaggedNode,
  OperationType,
  Variables,
} from "relay-runtime";
import { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";

// 各ページコンポーネントが受け取る props の型
export type RelayPageProps<Q extends OperationType = OperationType> = {
  initialPreloadedQuery?: PreloadedQuery<Q>;
};

// App コンポーネントが受け取る props の型
export type RelayAppPageProps<Q extends OperationType = OperationType> =
  RelayPageProps<Q> & {
    relayDehydratedState?: {
      initialRecords: RecordMap;
      request: {
        query: ConcreteRequest | GraphQLTaggedNode;
        variables: Variables;
      };
    };
  };
