
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: require('./translation/en.json') },
      tr: { translation: require('./translation/tr.json') }
    },
    lng: 'en',
    fallbackLng: 'tr', 
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
