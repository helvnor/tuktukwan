import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-8 text-sm text-slate-600">
      <span>
        © {new Date().getFullYear()} {t("brand.name")}
      </span>
      <Link to="/terms" className="hover:underline">
        {t("footer.terms")}
      </Link>
      <Link to="/privacy" className="hover:underline">
        {t("footer.privacy")}
      </Link>
    </footer>
  );
}
