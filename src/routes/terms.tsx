import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "../features/legal/TermsPage";
import { titleHead } from "../lib/pageTitle";

export const Route = createFileRoute("/terms")({
  head: () => titleHead("Terms of Service"),
  component: TermsPage,
});
