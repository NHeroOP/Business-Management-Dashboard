import { Business } from '@/types/model'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type BusinessStore = {
  isHydrated: boolean;
  setHydrated: (val: boolean) => void;

  businesses: Business[],
  currBusiness: Business | undefined,
  setBusinesses: (businesses: Business[]) => void,
  setCurrBusiness: (business: Business) => void,
}

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      isHydrated: false,
      setHydrated: (val) => set({ isHydrated: val }),

      businesses: [],
      currBusiness: undefined,
      setBusinesses: (businesses) => set({ businesses }),
      setCurrBusiness: (business) => set({currBusiness: business})
    }),
    {
      name: 'business-store',
      onRehydrateStorage: (state) => {
        return (state, error) => {
          state?.setHydrated(true);
        };
      },
    },
  ),
)