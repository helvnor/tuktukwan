import type { ReactNode } from "react";
import { Footer } from "../chrome/Footer";
import { HeroBackground } from "./HeroBackground";
import { InfoSection } from "./InfoSection";
import { LandingHeader } from "./LandingHeader";
import { LandingHero } from "./LandingHero";

// The signed-out front page. Sign-in and signup dialogs open on top of it, so
// a visitor never leaves the page they arrived on.
export function LandingPage({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-300">
      <main className="relative">
        <HeroBackground />
        <div className="absolute inset-0 flex flex-col">
          <LandingHeader />
          <LandingHero />
        </div>
        <InfoSection />
      </main>
      <Footer />
      {children}
    </div>
  );
}
