import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "../../layouts/MainLayout";

export const Route = createFileRoute("/_authenticated/_main")({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
});
