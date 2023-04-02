import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import { AuthViewDTO } from '@api/AuthApi/models';

// import { useAppSelector } from '@store/hooks';
// import { getUserData } from '@store/auth/data';

import { localizationEn, localizationRu } from './locales';

// const { user } = useAppSelector(getUserData);

// const getLanguage = (lang: AuthViewDTO | null) => {
//   console.log('language', lang);
//   return lang;
// };

// getLanguage(user);

localStorage.setItem('language', 'en-US');

export const getLanguage = (): string => {
  const _language = localStorage.getItem('language');
  return _language as string;
};

const resources = {
  ru: {
    translation: localizationRu,
  },
  en: {
    translation: localizationEn,
  },
};

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18next.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: 'ru',
  lng: getLanguage(),
  // lng: 'en',
  // debug: false,
  // interpolation: {
  //   escapeValue: false,
  // },
});

export default i18next;

// TODO На будущее для бека
