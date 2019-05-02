import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseHeader from 'components/Header/Header.jsx';
import NavBar from 'components/Header/NavBar.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';

const Header = ({ ...props }) => {
    const { changeLocale, ...rest } = props;
    const { t } = useTranslation();

    const navs = [
        {
            'title': t('header.home'),
            'url': BaseUrl.homeUrl
        },
        {
            'title': t('header.myInsurances'),
            'url': BaseUrl.myInsurancesUrl
        },
        {
            'title': t('header.myClaims'),
            'url': BaseUrl.myClaimsUrl
        },
        {
            'title': t('header.aboutus'),
            'url': BaseUrl.aboutusUrl
        },
    ];

    return (
        <BaseHeader 
            color='primary'
            brand={t('header.brand')}
            links={<NavBar navs={navs} changeLocale={changeLocale} />}
            {...rest}
        />
    );
}

export default Header;