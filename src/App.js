import React, { useState } from 'react';
import AppRouter from 'routes/AppRouter.jsx';
import { default as i18nSetting } from "i18n.jsx";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Provider } from 'react-redux';
import ConfigureStore from 'store/config/configureStore.jsx';
import moment from 'moment';
import "assets/scss/material-kit-pro-react.scss?v=1.3.0";
import momentLocale from 'moment/locale/zh-cn';

const store = ConfigureStore();

const App = ({...props}) => {
    const [locale, setLocale] = useState('en');
    const { i18n } = useTranslation();
    moment.updateLocale('zh-cn', momentLocale);
    // moment.locale('en');
    // moment.locale('zh-cn');
    i18n.changeLanguage('cn');

    const changeLocale = (newLocale) => {
        setLocale(newLocale);
        i18n.changeLanguage(newLocale);
    }

    return (
        <AppRouter
            changeLocale={changeLocale}
            locale={locale}
            {...props}
        />
    );
}

const AppWithProvider = () => (
    <Provider store={store}>
        <I18nextProvider i18n={i18nSetting}>
            <App />
        </I18nextProvider>
    </Provider>
);

export default AppWithProvider;