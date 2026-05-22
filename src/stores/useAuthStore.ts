import { UserResponse } from "@/constants/userResponse";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  setAuth: (user: UserResponse, token: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: (user, token) => {
        set({ user, accessToken: token });
        Cookies.set("accessToken", token, { expires: 7 }); // Set cookie for middleware if needed
      },

      setAccessToken: (token) => {
        set({ accessToken: token });
        Cookies.set("accessToken", token, { expires: 7 });
      },

      logout: () => {
        set({ user: null, accessToken: null });
        Cookies.remove("accessToken");
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
