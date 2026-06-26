import { api } from "@/lib/api"
import { User } from "@/types/model"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface AuthStore {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void  
}

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    user: null,
    token: null,
    login: async (email, password) => {
      const res = await api.post("/auth/login", { email, password });
      set((state) => {
        state.user = res.data.user;
        state.token = res.data.token;
      });
    },
    logout: () => 
      set((state) => {
        state.user = null;
        state.token = null;
      }),
  }))
)