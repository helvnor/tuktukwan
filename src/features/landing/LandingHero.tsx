import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function LandingHero() {
  const { t } = useTranslation();
  return (
    <div className="z-50 mx-10 my-16 flex flex-col gap-7 text-center text-lg text-white sm:mx-32 sm:w-[37ch] sm:text-left lg:text-xl">
      <h1 className="flex flex-row items-center justify-center gap-3 text-4xl sm:justify-start sm:text-5xl lg:text-6xl">
        <span>{t("brand.name")}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl">
          ({t("brand.thai")})
        </span>
      </h1>
      <p className="text-base sm:text-inherit">{t("landing.heroBody")}</p>
      <div className="mt-5">
        <Link
          to="/welcome"
          search={{ login: "register" }}
          className="w-max rounded-xl border-2 border-white bg-transparent px-14 py-3 font-semibold text-white transition hover:bg-white hover:text-sky-700 sm:px-5"
        >
          {t("landing.join")}
        </Link>
      </div>
    </div>
  );
}
