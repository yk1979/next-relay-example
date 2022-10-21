import { Suspense } from "react";

export const wrapSuspense = <C extends (props: any) => any>(Component: C): C =>
  Object.assign(
    (props: any) => (
      <Suspense fallback={<div>...Loading</div>}>
        <Component {...props} />
      </Suspense>
    ),
    Component
  );
