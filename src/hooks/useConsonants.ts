import { useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "../api/graphql";
import { ConsonantsQuery } from "../graphql/queries/consonants";

export function useConsonants() {
  return useQuery({
    queryKey: ["consonants"],
    queryFn: async () => (await graphqlRequest(ConsonantsQuery)).consonants,
    // The alphabet does not change while the page is open.
    staleTime: Infinity,
  });
}
