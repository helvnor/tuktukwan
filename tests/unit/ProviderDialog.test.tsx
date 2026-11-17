import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, renderWithProviders, screen } from "../test-utils";
import { ProviderDialog } from "../../src/features/auth/ProviderDialog";
import { apiClient } from "../../src/api/client";

vi.mock("../../src/api/client", () => ({
  apiClient: { get: vi.fn(), post: vi.fn() },
}));

const mockedGet = vi.mocked(apiClient.get);

function providersAre(providers: string[]) {
  mockedGet.mockResolvedValue({ data: { providers } });
}

describe("ProviderDialog", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("offers the configured providers, LINE first", async () => {
    providersAre(["github", "google", "line"]);
    renderWithProviders(
      <ProviderDialog mode="signin" open onClose={() => {}} onSelect={() => {}} />,
    );

    const buttons = await screen.findAllByRole("button", { name: /^Sign in with/ });
    expect(buttons.map((b) => b.textContent)).toEqual([
      "Sign in with LINE",
      "Sign in with Google",
      "Sign in with GitHub",
    ]);
    expect(mockedGet).toHaveBeenCalledWith("/auth/oauth");
  });

  it("leaves out excluded providers when linking", async () => {
    providersAre(["google", "line"]);
    renderWithProviders(
      <ProviderDialog
        mode="link"
        open
        onClose={() => {}}
        onSelect={() => {}}
        exclude={["line"]}
      />,
    );

    expect(await screen.findByRole("button", { name: "Link to Google" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Link to LINE" })).not.toBeInTheDocument();
  });

  it("says so when every provider is already linked", async () => {
    providersAre(["line"]);
    renderWithProviders(
      <ProviderDialog mode="link" open onClose={() => {}} onSelect={() => {}} exclude={["line"]} />,
    );

    expect(await screen.findByText("Every available account is already linked.")).toBeInTheDocument();
  });

  it("starts the redirect and shows that it is waiting", async () => {
    providersAre(["line"]);
    const onSelect = vi.fn();
    renderWithProviders(
      <ProviderDialog mode="register" open onClose={() => {}} onSelect={onSelect} />,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Register using LINE" }));
    expect(onSelect).toHaveBeenCalledWith("line");
    expect(screen.getByRole("status")).toHaveTextContent("Redirecting, please wait...");
  });

  it("explains a failed sign-in", async () => {
    providersAre(["google"]);
    renderWithProviders(
      <ProviderDialog
        mode="signin"
        open
        error="signup_expired"
        onClose={() => {}}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Your signup timed out. Sign in again to finish creating your account.",
    );
  });

  it("falls back to a generic message for an unknown error", () => {
    providersAre([]);
    renderWithProviders(
      <ProviderDialog mode="signin" open error="weird" onClose={() => {}} onSelect={() => {}} />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong. Please try again.");
  });
});
