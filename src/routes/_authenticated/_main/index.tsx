import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../../../features/home/HomePage";
import { titleHead } from "../../../lib/pageTitle";

export const Route = createFileRoute("/_authenticated/_main/")({
  head: () => titleHead(),
  component: HomePage,
});
