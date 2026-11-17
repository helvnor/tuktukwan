import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-300 p-5 text-slate-800">
      <p className="font-thai text-6xl">ไม่พบ</p>
      <h1 className="text-2xl font-semibold">{t("notFound.title")}</h1>
      <Link to="/" className="rounded border-2 border-slate-500 px-5 py-2">
        {t("notFound.home")}
      </Link>
    </div>
  );
}
