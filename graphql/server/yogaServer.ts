import { createServer } from "@graphql-yoga/node";
import { loadFiles } from "@graphql-tools/load-files";
import { resolvers } from "./resolvers";

export const createYogaServer = async () => {
  const typeDefs = await loadFiles("graphql/schemas/index.graphql");
  return createServer({
    schema: {
      typeDefs,
      resolvers,
    },
  });
};
