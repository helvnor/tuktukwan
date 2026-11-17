import { useTranslation } from "react-i18next";
import type { ConsonantsQuery } from "../../graphql/generated/graphql";
import { useConsonants } from "../../hooks/useConsonants";

type Consonant = ConsonantsQuery["consonants"][number];
type ConsonantClass = Consonant["class"];

const classStyles: Record<ConsonantClass, string> = {
  HIGH: "bg-rose-100 text-rose-800",
  MID: "bg-amber-100 text-amber-800",
  LOW_PAIRED: "bg-sky-100 text-sky-800",
  LOW_UNPAIRED: "bg-emerald-100 text-emerald-800",
};

export function LearnPage() {
  const { t } = useTranslation();
  const consonants = useConsonants();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl">{t("learn.title")}</h1>
        <p className="max-w-[65ch] text-slate-700">{t("learn.intro")}</p>
        <ul className="flex flex-row flex-wrap gap-2 pt-2 text-xs">
          {(Object.keys(classStyles) as ConsonantClass[]).map((cls) => (
            <li key={cls} className={`rounded px-2 py-1 ${classStyles[cls]}`}>
              {t(`learn.class.${cls}`)}
            </li>
          ))}
        </ul>
      </header>

      {consonants.isPending && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6" aria-hidden>
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i} className="h-44 animate-pulse rounded bg-slate-200" />
          ))}
        </ul>
      )}
      {consonants.isError && (
        <p role="alert" className="text-red-700">
          {t("learn.loadError")}
        </p>
      )}
      {consonants.isSuccess && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {consonants.data.map((c) => (
            <ConsonantCard key={c.id} consonant={c} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ConsonantCard({ consonant: c }: { consonant: Consonant }) {
  const { t } = useTranslation();
  return (
    <li
      className={`flex flex-col items-center gap-1 rounded bg-slate-200 p-4 text-center ${c.obsolete ? "opacity-60" : ""}`}
    >
      <span lang="th" className="font-thai text-6xl leading-tight text-slate-900">
        {c.character}
      </span>
      <span lang="th" className="font-thai text-lg">
        {c.sampleWord}
      </span>
      <span className="text-sm text-slate-700">
        {c.sampleRomanization} · {c.sampleTranslation}
      </span>
      <span className={`mt-1 rounded px-2 py-0.5 text-xs ${classStyles[c.class]}`}>
        {t(`learn.class.${c.class}`)}
      </span>
      <dl className="grid grid-cols-2 gap-x-2 pt-1 text-xs text-slate-600">
        <dt>{t("learn.initial")}</dt>
        <dd>{c.initialRomanization ?? t("learn.silent")}</dd>
        <dt>{t("learn.final")}</dt>
        <dd>{c.finalSound ?? t("learn.none")}</dd>
      </dl>
      {c.obsolete && (
        <span className="text-xs font-semibold text-slate-600">
          {t("learn.obsolete")}
        </span>
      )}
    </li>
  );
}
