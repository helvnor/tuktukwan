import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/authStore";

export function HomePage() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-3xl">
        {t("home.greeting", { name: user?.displayName ?? "" })}
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">{t("home.lessons")}</h2>
        <Link
          to="/learn"
          className="flex flex-row items-center justify-between gap-4 rounded bg-slate-200 p-5 transition hover:bg-slate-100"
        >
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{t("home.consonants")}</span>
            <span className="text-sm text-slate-600">
              {t("home.consonantsBody")}
            </span>
          </div>
          <span className="font-thai text-4xl text-slate-700" aria-hidden>
            กขค
          </span>
        </Link>
        {(["vowels", "words"] as const).map((lesson) => (
          <div
            key={lesson}
            aria-disabled
            className="flex flex-row items-center justify-between rounded bg-slate-200/60 p-5 text-slate-500"
          >
            <span className="font-semibold">{t(`home.${lesson}`)}</span>
            <span className="text-sm">{t("home.comingSoon")}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
