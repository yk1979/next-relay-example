import { Resolvers } from "../../__generated__/codegen/graphql";

// ローディング確認のために遅延させる
const sleep = async () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

export const resolvers: Resolvers = {
  Query: {
    hello: async () => {
      await sleep();
      return "Hello from Yoga!";
    },
  },
};
