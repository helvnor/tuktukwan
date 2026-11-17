import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, renderWithProviders, screen, waitFor, within } from "../test-utils";
import { LinkedAccounts } from "../../src/features/profile/LinkedAccounts";
import { graphqlRequest } from "../../src/api/graphql";
import type { LinkedProvider } from "../../src/store/authStore";

vi.mock("../../src/api/graphql", () => ({ graphqlRequest: vi.fn() }));

const mockedRequest = vi.mocked(graphqlRequest);

const line: LinkedProvider = {
  provider: "line",
  name: "Somchai",
  email: null,
  picture: null,
  linkedAt: "2026-01-02T03:04:05Z",
};
const github: LinkedProvider = {
  provider: "github",
  name: "octo",
  email: "o@example.com",
  picture: null,
  linkedAt: "2026-02-02T03:04:05Z",
};

describe("LinkedAccounts", () => {
  beforeEach(() => {
    mockedRequest.mockReset();
  });

  it("won't unlink the only provider", () => {
    renderWithProviders(<LinkedAccounts providers={[line]} />);

    expect(screen.getByRole("button", { name: "Unlink LINE" })).toBeDisabled();
    expect(
      screen.getAllByText("This is your only way to sign in, so it can't be unlinked.").length,
    ).toBeGreaterThan(0);
  });

  it("asks before unlinking, and unlinks on confirm", async () => {
    mockedRequest.mockResolvedValue({
      disconnectOAuth: {
        id: "u1",
        username: "somchai",
        displayName: "Somchai",
        email: "s@example.com",
        createdAt: "2026-01-02T03:04:05Z",
        avatarUrl: null,
        linkedProviders: [line],
      },
    });
    renderWithProviders(<LinkedAccounts providers={[line, github]} />);

    fireEvent.click(screen.getByRole("button", { name: "Unlink GitHub" }));
    expect(mockedRequest).not.toHaveBeenCalled();

    const dialog = screen.getByRole("dialog", { name: "Unlink GitHub?" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Unlink" }));

    await waitFor(() => {
      expect(mockedRequest).toHaveBeenCalledWith(expect.anything(), { provider: "github" });
    });
  });

  it("keeps the provider when the confirmation is declined", () => {
    renderWithProviders(<LinkedAccounts providers={[line, github]} />);

    fireEvent.click(screen.getByRole("button", { name: "Unlink LINE" }));
    fireEvent.click(screen.getByRole("button", { name: "Keep it" }));

    expect(mockedRequest).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the API's refusal", async () => {
    mockedRequest.mockRejectedValue(new Error("auth.cannotRemoveLastLoginMethod"));
    renderWithProviders(<LinkedAccounts providers={[line, github]} />);

    fireEvent.click(screen.getByRole("button", { name: "Unlink LINE" }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Unlink" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "This is your only way to sign in. Link another account before unlinking it.",
    );
  });
});
