/**
 * @generated SignedSource<<2f861ff677a813a375c46054e9765697>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type sampleQuery$variables = {};
export type sampleQuery$data = {
  readonly hello: string | null;
};
export type sampleQuery = {
  response: sampleQuery$data;
  variables: sampleQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "hello",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "sampleQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "sampleQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9abcb8638d0365ba129c54d197cc4c55",
    "id": null,
    "metadata": {},
    "name": "sampleQuery",
    "operationKind": "query",
    "text": "query sampleQuery {\n  hello\n}\n"
  }
};
})();

(node as any).hash = "9c1fc0b9e2807c7f1e5a312bf7c02a0f";

export default node;
