import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";
import { apiClient } from "./client";

export async function graphqlRequest<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
): Promise<TResult> {
  const response = await apiClient.post("/graphql", {
    query: print(document),
    variables: variables ?? undefined,
  });

  if (response.data.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data;
}
