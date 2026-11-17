import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";
import { apiClient } from "../api/client";

interface AuthResponse {
  message: string;
}

export interface ApiError {
  error: string;
}

export const toErrorCode = (error: AxiosError<ApiError>): string =>
  error.response
    ? (error.response.data?.error ?? "errors.generic")
    : "errors.network";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, logout: storeLogout } = useAuthStore();

  const logoutMutation = useMutation<AuthResponse, AxiosError<ApiError>, void>({
    mutationFn: () =>
      apiClient.post<AuthResponse>("/auth/logout").then((res) => res.data),
    onSettled: () => {
      // Signed out either way: a 401 here means the session was already gone.
      storeLogout();
      queryClient.clear();
      navigate({ to: "/welcome", replace: true });
    },
  });

  return {
    isAuthenticated,
    logout: () => logoutMutation.mutate(),
    logoutIsPending: logoutMutation.isPending,
  };
};
