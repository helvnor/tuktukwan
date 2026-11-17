import { createFileRoute } from "@tanstack/react-router";
import { LearnPage } from "../../../features/learn/LearnPage";
import { titleHead } from "../../../lib/pageTitle";

export const Route = createFileRoute("/_authenticated/_main/learn")({
  head: () => titleHead("Learn"),
  component: LearnPage,
});
