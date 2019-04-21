import React, { useState } from 'react';
import './App.css';

import AppRouter from 'routes/AppRouter.jsx';
import {default as i18nSetting} from "i18n.jsx";
import { I18nextProvider, useTranslation } from "react-i18next";

const App = () => {
  const [locale, setLocale] = useState('en');
  const { i18n } = useTranslation();

  // i18n.changeLanguage('cn');

  const changeLocale = (newLocale) => {
      setLocale(newLocale);
      i18n.changeLanguage(newLocale);
  }

  return (
      <AppRouter
        changeLocale={changeLocale} 
        locale={locale}
      />
  );
}

const AppWithProvider = () => (
    <I18nextProvider i18n={i18nSetting}>
        <App />
    </I18nextProvider>
);



export default AppWithProvider;