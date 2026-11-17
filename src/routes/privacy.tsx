import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "../features/legal/PrivacyPage";
import { titleHead } from "../lib/pageTitle";

export const Route = createFileRoute("/privacy")({
  head: () => titleHead("Privacy Policy"),
  component: PrivacyPage,
});
