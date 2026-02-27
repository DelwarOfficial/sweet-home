import { create } from 'zustand';

type Lang = 'en' | 'bn';

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') as Lang : null;

const defaultLang = stored || 'en';
if (typeof window !== 'undefined') {
  document.documentElement.lang = defaultLang;
}

export const useLang = create<LangStore>((set) => ({
  lang: defaultLang,
  setLang: (lang) => {
    localStorage.setItem('lang', lang);
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
    set({ lang });
  },
  toggle: () => set((s) => {
    const next = s.lang === 'en' ? 'bn' : 'en';
    localStorage.setItem('lang', next);
    if (typeof window !== 'undefined') {
      document.documentElement.lang = next;
    }
    return { lang: next };
  }),
}));

export const t = (en: string, bn: string, lang: Lang) => lang === 'bn' ? bn : en;
