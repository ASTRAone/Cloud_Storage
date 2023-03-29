import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { localizationEn, localizationRu } from './locales';

// TODO На будущее для бека

// export const getLanguage = (): string => {
//   let _user = localStorage.getItem('user')
//   let user: UserDtoType | undefined
//   if (_user) {
//     user = JSON.parse(_user) as UserDtoType
//   }
//   return (
//     user?.userInfo?.language?.toLocaleLowerCase() ||
//     i18next.language ||
//     window.localStorage.i18nextLng ||
//     'ru'
//   )
// }

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
  lng: 'ru',
  // debug: false,
  // interpolation: {
  //   escapeValue: false,
  // },
});

export default i18next;
