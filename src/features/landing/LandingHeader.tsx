import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Logo } from "../../components/Logo";

export function LandingHeader() {
  const { t } = useTranslation();
  return (
    <div className="z-50 grid w-full grid-cols-2 px-8 py-5 text-white">
      <Logo className="text-white" />

      <div className="flex flex-row items-center gap-8 justify-self-end">
        <Link
          to="/welcome"
          search={{ login: "signin" }}
          className="group py-2 font-semibold"
        >
          <span className="border-b-2 border-transparent pb-1 transition group-hover:border-white">
            {t("landing.signIn")}
          </span>
        </Link>
        <Link
          to="/welcome"
          search={{ login: "register" }}
          className="hidden rounded-xl border-2 border-white bg-white/90 px-4 py-2.5 font-semibold text-sky-700 transition hover:bg-transparent hover:text-white sm:inline"
        >
          {t("landing.register")}
        </Link>
      </div>
    </div>
  );
}
