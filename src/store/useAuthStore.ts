import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    isAuthenticate: boolean;
    user: string | null;
    login: (userName: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticate: false,
            login: (userName) =>
                set({
                    user: userName,
                    isAuthenticate: true,
                }),
            logout: () => ({ user: null, isAuthenticate: false}),
        }),
        { name: "auth-store"},
    ),
);