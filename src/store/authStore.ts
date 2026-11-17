import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MeQuery } from "../graphql/generated/graphql";

// The stored user is exactly what the Me query (and the full-shape user
// mutations) return, so the type can never drift from the schema.
export type User = NonNullable<MeQuery["me"]>;
export type LinkedProvider = User["linkedProviders"][number];

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      // Marks the session authenticated and caches the freshest server copy of
      // the user; also called after mutations that return the updated user.
      setUser: (user: User) => {
        set({ isAuthenticated: true, user });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);
