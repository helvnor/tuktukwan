import { useTranslation } from "react-i18next";

export function InfoSection() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto flex max-w-[60ch] flex-col gap-4 px-8 py-16 text-slate-800">
      <h2 className="text-2xl font-semibold">{t("landing.infoTitle")}</h2>
      <p className="leading-relaxed">{t("landing.infoBody")}</p>
    </section>
  );
}
