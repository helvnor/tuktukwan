import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../components/Avatar";
import { toErrorCode } from "../../hooks/useAuth";
import { useSignup, type PendingSignup } from "../../hooks/useSignup";
import {
  fieldForSignupError,
  signupSchema,
  type SignupSchema,
} from "../../schemas/signupSchema";

interface SignupFormProps {
  pending: PendingSignup;
  onCreated: () => void;
  onExpired: () => void;
  onCancel: () => void;
}

const inputClass = (invalid: boolean) =>
  `w-full rounded-lg border-2 bg-transparent p-3 outline-none placeholder:tracking-widest focus:border-blue-400 ${
    invalid
      ? "border-red-600/65 placeholder:text-red-600/40"
      : "border-slate-950/20 placeholder:text-slate-950/50"
  }`;

export function SignupForm({
  pending,
  onCreated,
  onExpired,
  onCancel,
}: SignupFormProps) {
  const { t } = useTranslation();
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      displayName: pending.name,
      email: pending.email,
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const onSubmit = (values: SignupSchema) => {
    signup.mutate(values, {
      onSuccess: onCreated,
      onError: (error) => {
        const code = toErrorCode(error);
        if (code === "signup.expired") {
          onExpired();
          return;
        }
        setError(fieldForSignupError(code) ?? "root", { message: code });
      },
    });
  };

  const provider = t(`providers.${pending.provider}`, {
    defaultValue: pending.provider,
  });
  const termsError = errors.acceptTerms?.message ?? errors.acceptPrivacy?.message;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-3 sm:w-80"
    >
      <Avatar
        src={pending.picture || "/profilePic.jpg"}
        className="my-3.5 h-36 w-36 bg-blue-100"
      />
      <p className="text-sm text-slate-700">
        {t("signup.intro", { provider })}
      </p>

      <Field
        id="username"
        label={t("signup.username.label")}
        error={errors.username?.message}
      >
        <input
          id="username"
          autoFocus
          autoComplete="username"
          placeholder={t("signup.username.placeholder")}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "username-error" : undefined}
          className={inputClass(!!errors.username)}
          {...register("username")}
        />
      </Field>
      <Field
        id="displayName"
        label={t("signup.displayName.label")}
        error={errors.displayName?.message}
      >
        <input
          id="displayName"
          autoComplete="name"
          placeholder={t("signup.displayName.placeholder")}
          aria-invalid={!!errors.displayName}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
          className={inputClass(!!errors.displayName)}
          {...register("displayName")}
        />
      </Field>
      <Field
        id="email"
        label={t("signup.email.label")}
        error={errors.email?.message}
      >
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={t("signup.email.placeholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass(!!errors.email)}
          {...register("email")}
        />
      </Field>

      <div className="flex w-full flex-col gap-1 px-1 pt-2.5 text-sm">
        <label className="flex flex-row items-center gap-2">
          <input type="checkbox" {...register("acceptTerms")} />
          <span>
            {t("signup.terms.accept")}{" "}
            <Link
              to="/terms"
              target="_blank"
              className="text-blue-500 underline"
            >
              {t("signup.terms.termsLink")}
            </Link>
          </span>
        </label>
        <label className="flex flex-row items-center gap-2">
          <input type="checkbox" {...register("acceptPrivacy")} />
          <span>
            {t("signup.terms.accept")}{" "}
            <Link
              to="/privacy"
              target="_blank"
              className="text-blue-500 underline"
            >
              {t("signup.terms.privacyLink")}
            </Link>
          </span>
        </label>
        {termsError && (
          <p role="alert" className="text-xs text-red-600">
            {t(termsError)}
          </p>
        )}
      </div>

      {errors.root?.message && (
        <p role="alert" className="w-full text-sm text-red-600">
          {t(errors.root.message, { defaultValue: t("errors.generic") })}
        </p>
      )}

      <div className="flex w-full flex-row justify-end gap-5 pt-6">
        <button
          type="submit"
          disabled={signup.isPending}
          className="mt-4 w-full cursor-pointer rounded border-2 px-4 py-2 whitespace-nowrap text-black disabled:cursor-wait disabled:opacity-60"
        >
          {t(signup.isPending ? "signup.creating" : "signup.create")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-4 w-full cursor-pointer rounded border-2 px-4 py-2 whitespace-nowrap text-black"
        >
          {t("signup.cancel")}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-1 text-xs">
      <label
        htmlFor={id}
        className={`px-[0.85rem] tracking-widest ${error ? "text-red-600" : ""}`}
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="px-[0.85rem] text-red-600">
          {t(error)}
        </p>
      )}
    </div>
  );
}
