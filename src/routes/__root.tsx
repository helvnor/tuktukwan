import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { NotFoundPage } from "../features/legal/NotFoundPage";

export interface RouterContext {
  queryClient: QueryClient;
}

const RootLayout = () => (
  <>
    <HeadContent />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
