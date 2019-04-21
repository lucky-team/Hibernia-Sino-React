import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import BaseHeader from "components/Header/Header.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import * as BaseUrl from 'assets/BaseUrl.jsx';

import navbarsStyle from "assets/jss/material-kit-pro-react/views/navbarsStyle.jsx";

const Header = ({ ...props }) => {
    const { classes, ...rest} = props;
    const { t } = useTranslation();

    const Links = () => {
        const navItems = []
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
        navs.map(nav => {
            let item = (
                <ListItem className={classes.listItem} key={nav.url}>
                    <Button
                        href={nav.url}
                        className={classes.navLink}
                        onClick={e => e.preventDefault()}
                        color='transparent'
                    >
                        {nav.title}
                    </Button>
                </ListItem>
            );
            navItems.push(item);
        });

        return (
            <List className={classes.list + " " + classes.mlAuto}>
                {navItems}
            </List>
        );

    }

    return (
        <BaseHeader 
            color='primary'
            brand={t('header.brand')}
            fixed
            changeColorOnScroll={{
                height: 300, color: 'info'
            }}
            links={<Links />}
        />
    );
}

export default withStyles(navbarsStyle)(Header);