import { create } from 'zustand';

type AppStore = {
  currency: string;
  locale: string;
  setCurrency: (currency: string) => void;
  setLocale: (locale: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  currency: 'INR',
  locale: 'en',
  setCurrency: (currency) => set({ currency }),
  setLocale: (locale) => set({ locale })
}));
