import { useEffect, useRef } from "react";
import { PreloadedQuery } from "react-relay";
import { OperationType } from "relay-runtime";

export function useDispose<T extends OperationType>(
  preloadedQuery: PreloadedQuery<T> | undefined | null
) {
  const ref = useRef<Set<PreloadedQuery<T>>>();
  if (!ref.current) {
    ref.current = new Set<PreloadedQuery<T>>();
  }
  const disposingQueries = ref.current;
  if (preloadedQuery != null) {
    disposingQueries.delete(preloadedQuery);
  }

  useEffect(() => {
    return () => {
      if (preloadedQuery == null) {
        return;
      }

      if (process.env.NODE_ENV === "production") {
        preloadedQuery.dispose();
        return;
      }

      disposingQueries.add(preloadedQuery);
      setTimeout(() => {
        if (
          disposingQueries.delete(preloadedQuery) &&
          !preloadedQuery.isDisposed &&
          typeof preloadedQuery.dispose === "function"
        ) {
          preloadedQuery.dispose();
        }
      }, 10000);
    };
  }, [preloadedQuery, disposingQueries]);
}
