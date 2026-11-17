import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";
import { meQueryOptions } from "../hooks/useUser";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const data = await context.queryClient.fetchQuery(meQueryOptions);
      if (!data.me) throw null;
      useAuthStore.getState().setUser(data.me);
    } catch {
      useAuthStore.getState().logout();
      throw redirect({ to: "/welcome" });
    }
  },
  component: () => <Outlet />,
});
