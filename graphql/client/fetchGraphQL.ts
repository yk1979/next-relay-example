import { FetchFunction } from "relay-runtime";

const fetchGraphQL: FetchFunction = async (params, variables) => {
  const response = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return await response.json();
};

export default fetchGraphQL;
