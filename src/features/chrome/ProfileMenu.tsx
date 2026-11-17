import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../components/Avatar";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";

export function ProfileMenu() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const { logout, logoutIsPending } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="profile-menu"
        aria-label={t("nav.menu")}
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer flex-row items-center justify-center gap-1.5"
      >
        <span className="hidden max-w-[16ch] truncate sm:inline">
          {user?.username}
        </span>
        <Avatar src={user?.avatarUrl} />
      </button>

      <div
        id="profile-menu"
        hidden={!open}
        className="absolute top-full right-0 z-40 mt-4 w-48 rounded bg-slate-100 p-3 shadow-xl"
      >
        <div className="flex flex-col items-start gap-3">
          <Link to="/profile" onClick={close} className="hover:underline">
            {t("nav.profile")}
          </Link>
          <Link to="/settings" onClick={close} className="hover:underline">
            {t("nav.settings")}
          </Link>
          <button
            type="button"
            disabled={logoutIsPending}
            onClick={logout}
            className="cursor-pointer hover:underline"
          >
            {t("nav.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
