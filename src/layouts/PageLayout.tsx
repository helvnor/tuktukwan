import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../components/Logo";
import { Footer } from "../features/chrome/Footer";

// A plain page anyone can open, signed in or not, such as the legal pages.
export function PageLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-300">
      <header className="flex flex-row items-center justify-between bg-slate-200 px-5 py-4 sm:px-10">
        <Logo />
      </header>
      <main className="mx-auto flex w-full max-w-[60rem] flex-col gap-4 p-5">
        <div className="flex min-h-[60vh] flex-col gap-4 rounded-lg bg-white p-10">
          {children}
        </div>
        <Link to="/" className="w-fit rounded border-2 border-slate-500 px-5 py-2">
          {t("legal.back")}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
