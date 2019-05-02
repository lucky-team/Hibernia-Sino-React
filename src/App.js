import React, { useState, useEffect } from 'react';
import AppRouter from 'routes/AppRouter.jsx';
import { default as i18nSetting } from "i18n.jsx";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Provider } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import ConfigureStore from 'store/config/configureStore.jsx';
import moment from 'moment';
import "assets/scss/material-kit-pro-react.scss?v=1.3.0";
import momentLocale from 'moment/locale/zh-cn';

const store = ConfigureStore();
moment.updateLocale('cn', momentLocale);

const App  = (...props) => {
    const [locale, setLocale] = useState('en');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        moment.locale(locale);
        i18nSetting.changeLanguage(locale);
    })
    
    const changeLocale = (newLocale) => {
        setLocale(newLocale);
    }

    const emitMessage = (msg, variant='info') => {
        enqueueSnackbar(msg, { variant });
    }

    return (
        <AppRouter
            changeLocale={changeLocale}
            locale={locale}
            emitMessage={emitMessage}
            {...props}
        />
    );
}

const AppWithProvider = () => (
    <Provider store={store}>
        <I18nextProvider i18n={i18nSetting}>
            <SnackbarProvider maxSnack={5}>
                <App />
            </SnackbarProvider>
        </I18nextProvider>
    </Provider>
);

export default AppWithProvider;