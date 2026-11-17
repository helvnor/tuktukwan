import { queryOptions } from "@tanstack/react-query";
import { graphqlRequest } from "../api/graphql";
import { MeQuery } from "../graphql/queries/me";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: () => graphqlRequest(MeQuery),
  retry: false,
});
