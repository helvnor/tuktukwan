import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseButton, Modal } from "../../components/Modal";
import { useOAuthProviders } from "../../hooks/useOAuth";
import { providerStyle, sortProviders } from "../../lib/authProviders";

export type ProviderDialogMode = "signin" | "register" | "link";

interface ProviderDialogProps {
  mode: ProviderDialogMode;
  open: boolean;
  onClose: () => void;
  // Starts the provider's redirect. Kept as a prop so the page decides between
  // signing in and linking, and tests can watch it.
  onSelect: (provider: string) => void;
  // An i18n key under signin.errors, from a sign-in that came back failed.
  error?: string | null;
  // Providers to leave out, such as the ones already linked.
  exclude?: readonly string[];
}

export function ProviderDialog({
  mode,
  open,
  onClose,
  onSelect,
  error,
  exclude = [],
}: ProviderDialogProps) {
  const { t } = useTranslation();
  const providers = useOAuthProviders();
  const [redirecting, setRedirecting] = useState(false);

  // Coming back from the provider with the browser's Back button can restore
  // this page from the back/forward cache, still showing the spinner.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setRedirecting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const close = () => {
    setRedirecting(false);
    onClose();
  };

  const available = sortProviders(
    (providers.data ?? []).filter((p) => !exclude.includes(p)),
  );

  return (
    <Modal open={open} onClose={close} labelledBy="provider-dialog-title">
      <CloseButton onClick={close} label={t("signin.close")} />
      {redirecting ? (
        <div
          role="status"
          className="flex flex-col items-center justify-center gap-3 p-3 text-slate-800"
        >
          <i className="fa-solid fa-spinner fa-spin mt-2 text-4xl" aria-hidden />
          <p id="provider-dialog-title" className="font-semibold">
            {t("signin.redirecting")}
          </p>
          <p className="max-w-[42ch] text-center text-xs">
            {t("signin.redirectingHint")}
          </p>
        </div>
      ) : (
        <>
          <h2 id="provider-dialog-title" className="text-2xl font-semibold">
            {t(`signin.title.${mode}`)}
          </h2>
          <p className="max-w-full pb-4 text-sm sm:max-w-[42.5ch]">
            {t("signin.body")}
          </p>
          {error && (
            <p
              role="alert"
              className="max-w-full rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:max-w-[42.5ch]"
            >
              {t(`signin.errors.${error}`, {
                defaultValue: t("errors.generic"),
              })}
            </p>
          )}
          {providers.isPending && (
            <p className="text-sm text-slate-600">
              {t("signin.loadingProviders")}
            </p>
          )}
          {providers.isError && (
            <p role="alert" className="text-sm text-red-700">
              {t("errors.network")}
            </p>
          )}
          {providers.isSuccess && available.length === 0 && (
            <p className="text-sm text-slate-600">
              {t(mode === "link" ? "signin.allLinked" : "signin.noProviders")}
            </p>
          )}
          {available.map((provider) => {
            const style = providerStyle(provider);
            const name = t(`providers.${provider}`, { defaultValue: provider });
            return (
              <button
                key={provider}
                type="button"
                onClick={() => {
                  setRedirecting(true);
                  onSelect(provider);
                }}
                className={`flex w-full cursor-pointer flex-row items-center gap-1.5 rounded border-2 px-7 py-5 text-left text-base transition hover:text-white sm:text-lg ${style.button}`}
              >
                <i
                  className={`${style.icon} w-14 pr-4 text-4xl sm:text-5xl`}
                  aria-hidden
                />
                {t(`signin.action.${mode}`, { provider: name })}
              </button>
            );
          })}
        </>
      )}
    </Modal>
  );
}
