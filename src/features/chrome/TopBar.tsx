import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Logo } from "../../components/Logo";
import { ProfileMenu } from "./ProfileMenu";

const navLink =
  "w-16 text-center border-b-2 border-transparent pb-0.5 hover:border-slate-500";

export function TopBar() {
  const { t } = useTranslation();
  return (
    <header className="fixed z-50 flex w-full flex-row items-center justify-between bg-slate-200 px-5 py-4 shadow-lg shadow-slate-400/20 sm:px-10">
      <Logo />
      <nav className="flex flex-row items-center gap-5">
        <Link
          to="/"
          className={navLink}
          activeOptions={{ exact: true }}
          activeProps={{ className: "border-slate-800" }}
        >
          {t("nav.home")}
        </Link>
        <Link
          to="/learn"
          className={navLink}
          activeProps={{ className: "border-slate-800" }}
        >
          {t("nav.learn")}
        </Link>
        <ProfileMenu />
      </nav>
    </header>
  );
}
