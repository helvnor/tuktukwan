import { useTranslation } from "react-i18next";

export function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 rounded bg-slate-200 p-10">
      <h1 className="text-2xl font-semibold">{t("settings.title")}</h1>
      <p>{t("settings.body")}</p>
    </div>
  );
}
