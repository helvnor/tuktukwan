import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../components/Avatar";
import { connectOAuth } from "../../hooks/useOAuth";
import { useAuthStore } from "../../store/authStore";
import { ProviderDialog } from "../auth/ProviderDialog";
import { LinkedAccounts } from "./LinkedAccounts";

export interface LinkResult {
  oauth?: string;
  status?: string;
  error?: string;
}

interface ProfilePageProps {
  // What the API reported after a link attempt, from the URL it returned to.
  linkResult: LinkResult;
  onDismissLinkResult: () => void;
}

export function ProfilePage({ linkResult, onDismissLinkResult }: ProfilePageProps) {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const [linking, setLinking] = useState(false);

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-5">
      {linkResult.oauth && (
        <LinkResultBanner result={linkResult} onDismiss={onDismissLinkResult} />
      )}

      <div className="flex w-full flex-col gap-5 lg:flex-row">
        <section className="flex flex-col items-center justify-center gap-3 rounded bg-slate-200 p-10">
          <Avatar src={user.avatarUrl} className="h-32 w-32" />
          <h1 className="text-xl font-semibold">{user.displayName}</h1>
          <p>@{user.username}</p>
          <p className="text-sm text-slate-700">{user.email}</p>
          <p className="text-xs text-slate-600">
            {t("profile.memberSince", {
              date: new Date(user.createdAt).toLocaleDateString(i18n.language, {
                year: "numeric",
                month: "long",
              }),
            })}
          </p>
          <Link to="/settings" className="text-sm underline">
            {t("profile.edit")}
          </Link>
        </section>

        <section className="flex flex-col gap-3 rounded bg-slate-200 p-6 lg:w-max">
          <h2 className="font-semibold">{t("profile.linkedAccounts")}</h2>
          <LinkedAccounts providers={user.linkedProviders} />
          <button
            type="button"
            onClick={() => setLinking(true)}
            className="w-max cursor-pointer py-2 font-semibold hover:underline"
          >
            {t("profile.linkNew")}
          </button>
        </section>
      </div>

      <ProviderDialog
        mode="link"
        open={linking}
        onClose={() => setLinking(false)}
        onSelect={connectOAuth}
        exclude={user.linkedProviders.map((p) => p.provider)}
      />
    </div>
  );
}

function LinkResultBanner({
  result,
  onDismiss,
}: {
  result: LinkResult;
  onDismiss: () => void;
}) {
  const { t } = useTranslation();
  const provider = t(`providers.${result.oauth}`, { defaultValue: result.oauth });
  const ok = !result.error && result.status === "linked";
  const message = ok
    ? t("profile.link.linked", { provider })
    : t(`profile.link.${result.error}`, {
        provider,
        defaultValue: t("profile.link.link_failed", { provider }),
      });

  return (
    <div
      role={ok ? "status" : "alert"}
      className={`flex flex-row items-center justify-between gap-4 rounded border px-4 py-3 text-sm ${
        ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="cursor-pointer underline"
      >
        {t("profile.link.dismiss")}
      </button>
    </div>
  );
}
