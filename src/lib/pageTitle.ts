export const SITE_NAME = "Tuktukwan";

const SITE_SEPARATOR = " | ";

export function pageTitle(section?: string | null): string {
  const trimmed = section?.trim();
  return trimmed ? trimmed + SITE_SEPARATOR + SITE_NAME : SITE_NAME;
}

export function titleHead(section?: string | null) {
  return { meta: [{ title: pageTitle(section) }] };
}
