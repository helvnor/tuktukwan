import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiClient } from "../api/client";
import type { SignupSchema } from "../schemas/signupSchema";
import type { ApiError } from "./useAuth";

export interface PendingSignup {
  provider: string;
  name: string;
  email: string;
  picture: string;
}

// The provider identity waiting to become an account. The API answers 404
// when there is none, or it has expired.
export const pendingSignupQueryOptions = queryOptions({
  queryKey: ["pendingSignup"],
  queryFn: () =>
    apiClient.get<PendingSignup>("/auth/signup").then((res) => res.data),
  retry: false,
  staleTime: 0,
});

export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, SignupSchema>({
    mutationFn: async (data) => {
      await apiClient.post("/auth/signup", data);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useCancelSignup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/signup/cancel");
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: pendingSignupQueryOptions.queryKey });
    },
  });
}
