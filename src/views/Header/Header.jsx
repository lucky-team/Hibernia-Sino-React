import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseHeader from 'components/Header/Header.jsx';
import NavBar from 'components/Header/NavBar.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import { connect } from 'react-redux';

const Header = ({ ...props }) => {
    const { changeLocale, auth, ...rest } = props;
    const { t } = useTranslation();

    const navs = auth.employee ?
    [
        {
            'title': t('header.home'),
            'url': BaseUrl.homeUrl
        },
        {
            'title': t('header.manageClaims'),
            'url': BaseUrl.manageClaimsUrl
        },
        {
            'title': t('header.aboutus'),
            'url': BaseUrl.aboutusUrl
        },
    ]
    :
    [
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
            brand={auth.employee ?
                `${t('header.brand')} ${t('header.employee')}`
                :
                t('header.brand')}
            links={<NavBar navs={navs} changeLocale={changeLocale} />}
            {...rest}
        />
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(Header);