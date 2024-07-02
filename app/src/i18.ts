import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translation from '../public/locales/en/translation.json';
import bulgarianTranslation from '../public/locales/bg/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'bg',
    fallbackLng: 'bg',
    debug: true,
    defaultNS: 'defaultNamespace',
    resources: {
        bg: {
          defaultNamespace: bulgarianTranslation
        },
        en: {
          defaultNamespace: translation,
        }
      },
  });

export default i18n;