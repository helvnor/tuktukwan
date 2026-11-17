import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Logo({ className = "text-slate-800" }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <Link
      to="/"
      className={`flex w-max cursor-pointer flex-col items-center justify-center font-logo font-light ${className}`}
    >
      <img src="/logo.png" alt={t("brand.logoAlt")} className="-mb-1 h-10 w-12" />
      <span className="text-xl">{t("brand.thai")}</span>
    </Link>
  );
}
