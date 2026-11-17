import { beforeEach, describe, expect, it, vi } from "vitest";
import { AxiosError, type AxiosResponse } from "axios";
import { fireEvent, renderWithRouter, screen, waitFor } from "../test-utils";
import { SignupForm } from "../../src/features/auth/SignupForm";
import { apiClient } from "../../src/api/client";

vi.mock("../../src/api/client", () => ({
  apiClient: { get: vi.fn(), post: vi.fn() },
}));

const mockedPost = vi.mocked(apiClient.post);

const pending = {
  provider: "line",
  name: "Somchai",
  email: "s@example.com",
  picture: "",
};

function rejectWith(code: string, status = 409) {
  const error = new AxiosError("Request failed");
  error.response = { status, data: { error: code } } as AxiosResponse;
  mockedPost.mockRejectedValue(error);
}

async function renderForm(handlers: Partial<Record<"onCreated" | "onExpired" | "onCancel", () => void>> = {}) {
  renderWithRouter(
    <SignupForm
      pending={pending}
      onCreated={handlers.onCreated ?? (() => {})}
      onExpired={handlers.onExpired ?? (() => {})}
      onCancel={handlers.onCancel ?? (() => {})}
    />,
  );
  return screen.findByLabelText("Username");
}

function fillAndSubmit(username: string) {
  fireEvent.change(screen.getByLabelText("Username"), { target: { value: username } });
  fireEvent.click(screen.getByRole("checkbox", { name: /Terms of Service/ }));
  fireEvent.click(screen.getByRole("checkbox", { name: /Privacy Policy/ }));
  fireEvent.click(screen.getByRole("button", { name: "Create account" }));
}

describe("SignupForm", () => {
  beforeEach(() => {
    mockedPost.mockReset();
  });

  it("starts from what the provider shared", async () => {
    await renderForm();

    expect(screen.getByLabelText("Display name")).toHaveValue("Somchai");
    expect(screen.getByLabelText("Email")).toHaveValue("s@example.com");
    expect(screen.getByText("You signed in with LINE. Choose how you'll appear on tuktukwan to finish.")).toBeInTheDocument();
  });

  it("validates before sending anything", async () => {
    await renderForm();

    fireEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByText("Username must be 3 to 32 characters.")).toBeInTheDocument();
    expect(screen.getByText("Accept the Terms of Service and Privacy Policy to continue.")).toBeInTheDocument();
    expect(mockedPost).not.toHaveBeenCalled();
  });

  it("posts the signup and reports success", async () => {
    mockedPost.mockResolvedValue({ data: { message: "Signup successful" } });
    const onCreated = vi.fn();
    await renderForm({ onCreated });

    fillAndSubmit("somchai");

    await waitFor(() => expect(onCreated).toHaveBeenCalled());
    expect(mockedPost).toHaveBeenCalledWith("/auth/signup", {
      username: "somchai",
      displayName: "Somchai",
      email: "s@example.com",
      acceptTerms: true,
      acceptPrivacy: true,
    });
  });

  it("puts a taken username on the username field", async () => {
    rejectWith("signup.username.taken");
    await renderForm();

    fillAndSubmit("somchai");

    expect(await screen.findByText("That username is already taken.")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toHaveAttribute("aria-invalid", "true");
  });

  it("hands an expired signup back to the page", async () => {
    rejectWith("signup.expired", 400);
    const onExpired = vi.fn();
    await renderForm({ onExpired });

    fillAndSubmit("somchai");

    await waitFor(() => expect(onExpired).toHaveBeenCalled());
  });
});
