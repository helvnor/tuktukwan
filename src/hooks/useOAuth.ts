import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { environments } from "../config/environment";
import { graphqlRequest } from "../api/graphql";
import { DisconnectOAuthMutation } from "../graphql/mutations/oauth";
import { useAuthStore } from "../store/authStore";
import { meQueryOptions } from "./useUser";

// Which providers the backend actually has configured, so we only render
// buttons that will work.
export function useOAuthProviders() {
  return useQuery({
    queryKey: ["oauthProviders"],
    queryFn: async () => {
      const res = await apiClient.get<{ providers: string[] }>("/auth/oauth");
      return res.data.providers ?? [];
    },
    staleTime: Infinity,
  });
}

// Both flows are top-level redirects so the session cookie rides along; the
// backend sends the browser back to the SPA with the outcome.
function oauthRedirect(provider: string, action: "link" | "login") {
  window.location.href = `${environments.apiUrl}/auth/oauth/${provider}/${action}`;
}

// connectOAuth links a provider to the signed-in user (profile page).
export function connectOAuth(provider: string) {
  oauthRedirect(provider, "link");
}

// signInWithOAuth signs in with a provider, or starts signing up when no
// account has it linked yet (landing page).
export function signInWithOAuth(provider: string) {
  oauthRedirect(provider, "login");
}

export function useDisconnectOAuth() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (provider: string) =>
      graphqlRequest(DisconnectOAuthMutation, { provider }),
    onSuccess: (data) => {
      useAuthStore.getState().setUser(data.disconnectOAuth);
      queryClient.setQueryData(meQueryOptions.queryKey, {
        me: data.disconnectOAuth,
      });
    },
  });
}
