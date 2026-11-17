import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    [process.env.GRAPHQL_SCHEMA_URL || "http://localhost:8080/api/introspection"]:
      {},
  },
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
