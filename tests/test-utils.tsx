/* eslint-disable react-refresh/only-export-components */
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import type { ReactElement, ReactNode } from "react";
import i18n from "../src/i18n/config";

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  const queryClient = createTestQueryClient();
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </QueryClientProvider>
    );
  }
  return { queryClient, ...render(ui, { wrapper: Wrapper, ...options }) };
}

const LINK_TARGETS = [
  "/welcome",
  "/learn",
  "/profile",
  "/settings",
  "/terms",
  "/privacy",
] as const;

export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        {ui}
        <Outlet />
      </>
    ),
  });
  const routes = ["/", ...LINK_TARGETS].map((path) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: () => null,
    }),
  );
  const router = createRouter({
    routeTree: rootRoute.addChildren(routes),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return renderWithProviders(
    <RouterProvider router={router as never} />,
    options,
  );
}

export { i18n };
export * from "@testing-library/react";
