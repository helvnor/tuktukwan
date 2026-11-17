import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../components/Modal";
import { SignupForm } from "../../features/auth/SignupForm";
import { LandingPage } from "../../features/landing/LandingPage";
import { pendingSignupQueryOptions, useCancelSignup } from "../../hooks/useSignup";
import { titleHead } from "../../lib/pageTitle";

export const Route = createFileRoute("/_auth/signup")({
  head: () => titleHead("Sign up"),
  // The API sends a provider sign-in nobody owns yet here. Without one waiting
  // (expired, cancelled, or opened directly) there is nothing to finish.
  loader: async ({ context }) => {
    try {
      return await context.queryClient.fetchQuery(pendingSignupQueryOptions);
    } catch {
      throw redirect({
        to: "/welcome",
        search: { login: "signin", error: "signup_expired" },
      });
    }
  },
  component: SignupRoute,
});

function SignupRoute() {
  const { t } = useTranslation();
  const pending = Route.useLoaderData();
  const navigate = useNavigate();
  const cancel = useCancelSignup();

  const leave = () =>
    cancel.mutate(undefined, {
      onSettled: () => navigate({ to: "/welcome", replace: true }),
    });

  return (
    <LandingPage>
      <Modal open onClose={leave} labelledBy="signup-title">
        <CloseButton onClick={leave} label={t("signin.close")} />
        <h1 id="signup-title" className="-mt-4 text-lg font-semibold">
          {t("signup.title")}
        </h1>
        <SignupForm
          pending={pending}
          onCreated={() => navigate({ to: "/", replace: true })}
          onExpired={() =>
            navigate({
              to: "/welcome",
              search: { login: "signin", error: "signup_expired" },
              replace: true,
            })
          }
          onCancel={leave}
        />
      </Modal>
    </LandingPage>
  );
}
