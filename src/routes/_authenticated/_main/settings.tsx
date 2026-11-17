import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "../../../features/settings/SettingsPage";
import { titleHead } from "../../../lib/pageTitle";

export const Route = createFileRoute("/_authenticated/_main/settings")({
  head: () => titleHead("Settings"),
  component: SettingsPage,
});
