module.exports = {
  src: "./",
  language: "typescript",
  schema: "./graphql/schemas/index.graphql",
  artifactDirectory: "./graphql/__generated__/relay",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
};
