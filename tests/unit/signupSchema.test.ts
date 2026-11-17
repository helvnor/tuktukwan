import { describe, expect, it } from "vitest";
import {
  fieldForSignupError,
  signupSchema,
} from "../../src/schemas/signupSchema";

const valid = {
  username: "somchai_j",
  displayName: "Somchai",
  email: "s@example.com",
  acceptTerms: true,
  acceptPrivacy: true,
};

function errorFor(input: Partial<typeof valid>) {
  const result = signupSchema.safeParse({ ...valid, ...input });
  return result.success ? null : result.error.issues[0].message;
}

describe("signupSchema", () => {
  it("accepts a valid signup and trims it", () => {
    const result = signupSchema.parse({
      ...valid,
      username: " somchai ",
      email: " s@example.com ",
    });
    expect(result.username).toBe("somchai");
    expect(result.email).toBe("s@example.com");
  });

  it("uses the API's error codes as messages", () => {
    expect(errorFor({ username: "so" })).toBe("signup.username.length");
    expect(errorFor({ username: "a".repeat(33) })).toBe("signup.username.length");
    expect(errorFor({ username: "som chai" })).toBe("signup.username.format");
    expect(errorFor({ username: "สมชาย" })).toBe("signup.username.format");
    expect(errorFor({ displayName: "So" })).toBe("signup.displayName.length");
    expect(errorFor({ email: "example.com" })).toBe("signup.email.invalid");
    expect(errorFor({ acceptTerms: false })).toBe("signup.terms.required");
    expect(errorFor({ acceptPrivacy: false })).toBe("signup.terms.required");
  });

  it("allows a Thai display name", () => {
    expect(errorFor({ displayName: "สมชาย ใจดี" })).toBeNull();
  });
});

describe("fieldForSignupError", () => {
  it("maps API codes to form fields", () => {
    expect(fieldForSignupError("signup.username.taken")).toBe("username");
    expect(fieldForSignupError("signup.email.taken")).toBe("email");
    expect(fieldForSignupError("signup.displayName.length")).toBe("displayName");
    expect(fieldForSignupError("signup.terms.required")).toBe("acceptTerms");
    expect(fieldForSignupError("auth.serverError")).toBeNull();
  });
});
