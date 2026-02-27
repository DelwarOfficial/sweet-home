import { create } from 'zustand';

type Lang = 'en' | 'bn';

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') as Lang : null;

export const useLang = create<LangStore>((set) => ({
  lang: stored || 'en',
  setLang: (lang) => {
    localStorage.setItem('lang', lang);
    set({ lang });
  },
  toggle: () => set((s) => {
    const next = s.lang === 'en' ? 'bn' : 'en';
    localStorage.setItem('lang', next);
    return { lang: next };
  }),
}));

export const t = (en: string, bn: string, lang: Lang) => lang === 'bn' ? bn : en;
