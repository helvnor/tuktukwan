import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProfilePage, type LinkResult } from "../../../features/profile/ProfilePage";
import { titleHead } from "../../../lib/pageTitle";

const optional = (value: unknown) =>
  typeof value === "string" && value !== "" ? value : undefined;

export const Route = createFileRoute("/_authenticated/_main/profile")({
  head: () => titleHead("Profile"),
  // The API returns here after a link attempt with ?oauth=<provider> and
  // either status=linked or error=<code>.
  validateSearch: (search): LinkResult => ({
    oauth: optional(search.oauth),
    status: optional(search.status),
    error: optional(search.error),
  }),
  component: ProfileRoute,
});

function ProfileRoute() {
  const linkResult = Route.useSearch();
  const navigate = useNavigate();
  return (
    <ProfilePage
      linkResult={linkResult}
      onDismissLinkResult={() =>
        navigate({ to: "/profile", search: {}, replace: true })
      }
    />
  );
}
