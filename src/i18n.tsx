import * as i18next from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

import en from './lang/en-us.json';

const reactOptions: i18next.ReactOptions = {
  nsMode: 'default',
  wait: false,
};

const initOptions: i18next.InitOptions = {
  debug: false,
  fallbackLng: 'en',
  returnObjects: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: {
    en: {
      translation: en
    },
  },

  // react i18next special options (optional)
  react: reactOptions,
};

const i18n = i18next.use(LanguageDetector).init(initOptions);

export default i18n;
