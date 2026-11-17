# tuktukwan

Web client for tuktukwan (ทุกๆวัน, "every day"), a site for learning to read Thai a little every day. It talks to [tuktukwan-api](https://github.com/helvnor/tuktukwan-api).

## Tech Stack

- **React 19** + **TypeScript**, built with **Vite**
- **TanStack Router** (file-based routes in `src/routes`) and **TanStack Query**
- **Tailwind CSS 4**, **Font Awesome** icons
- **GraphQL** with typed documents from `graphql-codegen`
- **react-hook-form** + **Zod** for forms, **Zustand** for the signed-in user, **i18next** for copy
- **Vitest** + Testing Library for tests

## Getting Started

Start the API first (`docker compose up -d` in tuktukwan-api), then:

```sh
pnpm install
pnpm dev
```

The app runs on http://localhost:5173 and calls the API at `VITE_API_URL` (`http://localhost:8080/api` in `.env`). In dev the API offers a "Dev account" sign-in, so the whole sign-in and signup flow works without OAuth credentials.

## Scripts

| Command        | What it does                                                           |
| -------------- | ---------------------------------------------------------------------- |
| `pnpm dev`     | Dev server                                                             |
| `pnpm build`   | Type-check and build to `dist/`                                        |
| `pnpm test`    | Unit tests                                                             |
| `pnpm lint`    | ESLint                                                                 |
| `pnpm codegen` | Regenerate `src/graphql/generated` from the dev API's schema           |

Run `pnpm codegen` after changing a query in `src/graphql` or the API's schema. It reads the schema from `http://localhost:8080/api/introspection` (or `GRAPHQL_SCHEMA_URL`), which only the dev API serves.

## How signing in works

There are no passwords. Every sign-in goes through a provider (LINE, Google, Microsoft or GitHub), and the API decides what happens next:

- An identity that belongs to an account signs straight in.
- A new one lands on `/signup`, where the visitor picks a username, display name and email. The API keeps the provider identity for 30 minutes while they do.
- On the profile page a signed-in user can link more providers or unlink one, but never the last.

Sign-in failures come back to `/welcome?login=signin&error=<code>`, and link results to `/profile?oauth=<provider>&status=linked` or `&error=<code>`.

## Project Structure

```
src/
  api/          # axios client and the GraphQL request helper
  components/   # Shared pieces: modal, avatar, logo
  features/     # Pages and their parts, by area (landing, auth, profile, learn, …)
  graphql/      # Queries, mutations and generated types
  hooks/        # Data hooks (TanStack Query) and auth actions
  i18n/         # Copy, including messages for the API's error codes
  layouts/      # Signed-in layout and the plain page layout
  routes/       # TanStack Router file routes
  schemas/      # Zod form schemas
  store/        # Signed-in user (Zustand)
tests/unit/     # Vitest tests
```

## Deployment

Pushes to `main` audit the dependencies, run the tests and publish `:staging` to the GitHub Container Registry; the manual "Push to latest" workflow promotes it to `:latest`. Both need the `IMAGE_NAME` repository secret. The image is the static build served by nginx on port 8080; the cluster side lives in `web-infra`.
