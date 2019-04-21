import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import translationEng from 'assets/locales/en/translation.json';
import translationChn from 'assets/locales/cn/translation.json';

i18n
.use(XHR)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },

    resources: {
        en: {
            translations: translationEng
        },
        cn: {
            translations: translationChn
        }
    },
    // namespace
    ns: ['translations'],
    defaultNS: 'translations'
});

export default i18n;