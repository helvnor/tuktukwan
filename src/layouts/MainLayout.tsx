import type { ReactNode } from "react";
import { Footer } from "../features/chrome/Footer";
import { TopBar } from "../features/chrome/TopBar";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-300">
      <TopBar />
      <main className="mx-auto w-full max-w-[75rem] p-5 pt-28">{children}</main>
      <Footer />
    </div>
  );
}
