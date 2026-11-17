import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ProviderDialog } from "../../features/auth/ProviderDialog";
import { LandingPage } from "../../features/landing/LandingPage";
import { signInWithOAuth } from "../../hooks/useOAuth";
import { titleHead } from "../../lib/pageTitle";
import { useAuthStore } from "../../store/authStore";

interface WelcomeSearch {
  login?: "signin" | "register";
  error?: string;
}

export const Route = createFileRoute("/_auth/welcome")({
  head: () => titleHead(),
  validateSearch: (search): WelcomeSearch => ({
    login:
      search.login === "signin" || search.login === "register"
        ? search.login
        : undefined,
    error: typeof search.error === "string" ? search.error : undefined,
  }),
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: WelcomeRoute,
});

function WelcomeRoute() {
  const { login, error } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <LandingPage>
      <ProviderDialog
        mode={login ?? "signin"}
        open={!!login}
        error={error}
        onSelect={signInWithOAuth}
        onClose={() => navigate({ to: "/welcome", search: {}, replace: true })}
      />
    </LandingPage>
  );
}
