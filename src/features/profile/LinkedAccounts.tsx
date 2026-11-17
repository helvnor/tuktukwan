import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../components/Avatar";
import { Modal } from "../../components/Modal";
import { useDisconnectOAuth } from "../../hooks/useOAuth";
import { providerStyle } from "../../lib/authProviders";
import type { LinkedProvider } from "../../store/authStore";

interface LinkedAccountsProps {
  providers: readonly LinkedProvider[];
}

export function LinkedAccounts({ providers }: LinkedAccountsProps) {
  const { t, i18n } = useTranslation();
  const disconnect = useDisconnectOAuth();
  const [confirming, setConfirming] = useState<string | null>(null);

  // Providers are the only way to sign in, so the last one stays. The API
  // refuses too; this just explains it before anyone tries.
  const onlyOne = providers.length <= 1;
  const label = (provider: string) =>
    t(`providers.${provider}`, { defaultValue: provider });

  const confirm = () => {
    if (!confirming) return;
    disconnect.mutate(confirming, { onSettled: () => setConfirming(null) });
  };

  return (
    <div className="flex flex-col gap-1">
      <ul className="flex flex-col">
        {providers.map((p) => {
          const style = providerStyle(p.provider);
          return (
            <li
              key={p.provider}
              className="flex flex-row items-center justify-between gap-4 py-2"
            >
              <div className="flex flex-row items-center">
                <Avatar
                  src={p.picture}
                  className={`z-10 h-10 w-10 border-2 ${style.border}`}
                />
                <i
                  className={`${style.icon} ${style.text} -translate-x-2 translate-y-4 text-lg`}
                  aria-hidden
                />
                <div className="flex flex-col">
                  <span className={`border-b-2 ${style.border} w-max`}>
                    {p.name || p.email || label(p.provider)}
                  </span>
                  <span className="text-xs text-slate-600">
                    {label(p.provider)} ·{" "}
                    {t("profile.linkedOn", {
                      date: new Date(p.linkedAt).toLocaleDateString(i18n.language),
                    })}
                  </span>
                </div>
              </div>
              <button
                type="button"
                disabled={onlyOne || disconnect.isPending}
                title={onlyOne ? t("profile.onlyAccount") : undefined}
                aria-label={t("profile.unlinkProvider", { provider: label(p.provider) })}
                onClick={() => setConfirming(p.provider)}
                className="cursor-pointer rounded border border-slate-400 px-3 py-1 text-sm hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("profile.unlink")}
              </button>
            </li>
          );
        })}
      </ul>
      {onlyOne && (
        <p className="max-w-[40ch] text-xs text-slate-600">{t("profile.onlyAccount")}</p>
      )}
      {disconnect.isError && (
        <p role="alert" className="text-sm text-red-700">
          {t(disconnect.error.message, { defaultValue: t("errors.generic") })}
        </p>
      )}

      <Modal
        open={confirming !== null}
        onClose={() => setConfirming(null)}
        labelledBy="unlink-title"
        className="max-w-[40ch]"
      >
        {confirming && (
          <>
            <h2 id="unlink-title" className="text-xl font-semibold">
              {t("profile.confirmUnlink.title", { provider: label(confirming) })}
            </h2>
            <p className="text-sm">
              {t("profile.confirmUnlink.body", { provider: label(confirming) })}
            </p>
            <div className="flex flex-row justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="cursor-pointer rounded border-2 px-4 py-2"
              >
                {t("profile.confirmUnlink.cancel")}
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={disconnect.isPending}
                className="cursor-pointer rounded border-2 border-red-600 bg-red-600 px-4 py-2 text-white disabled:opacity-60"
              >
                {t("profile.confirmUnlink.confirm")}
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
