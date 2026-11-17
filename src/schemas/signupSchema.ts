import { z } from "zod";

// Mirrors validateSignupInput in tuktukwan-api, which has the final say. The
// messages are i18n keys and match the API's error codes, so a server-side
// rejection lands on the same field with the same text.
export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "signup.username.length")
    .max(32, "signup.username.length")
    .regex(/^[A-Za-z0-9_.-]+$/, "signup.username.format"),
  displayName: z
    .string()
    .trim()
    .min(3, "signup.displayName.length")
    .max(64, "signup.displayName.length"),
  email: z
    .string()
    .trim()
    .max(255, "signup.email.invalid")
    .pipe(z.email("signup.email.invalid")),
  acceptTerms: z.boolean().refine(Boolean, "signup.terms.required"),
  acceptPrivacy: z.boolean().refine(Boolean, "signup.terms.required"),
});

export type SignupSchema = z.infer<typeof signupSchema>;

// Which field an API error code belongs to, so the form can show it inline.
export function fieldForSignupError(
  code: string,
): keyof SignupSchema | null {
  if (code.startsWith("signup.username.")) return "username";
  if (code.startsWith("signup.displayName.")) return "displayName";
  if (code.startsWith("signup.email.")) return "email";
  if (code === "signup.terms.required") return "acceptTerms";
  return null;
}
