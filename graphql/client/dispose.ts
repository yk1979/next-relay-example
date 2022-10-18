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

      // productionモードではStrictモードが無効になるので以降の処理は関係ない
      if (process.env.NODE_ENV === "production") {
        preloadedQuery.dispose();
        return;
      }

      // React 18のStrictモードに対応するためpreloadedQueryの破棄を遅延する。
      //
      // Strictモードではレンダリング時にマウント→アンマウント→マウントと動作する。
      // 最初のアンマウントで即座にpreloadedQueryを破棄すると次のマウント後に
      // 破棄済みのpreloadedQueryが使われてしまい、Relayが警告メッセージを出力する。
      // そのためアンマウントから10秒後にpreloadedQueryを破棄する。
      // その間に次のマウントにより同じpreloadedQueryが渡された場合は破棄しないようにする。
      // 同様の理由によりStrictモードではアンマウントも2回呼ばれる。
      // 破棄済みのpreloadedQueryを重複して破棄するとRelayが警告メッセージを出力するため、
      // 既に破棄済みかチェックする。
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
