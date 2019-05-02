import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { AccountCircle, Language } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.jsx';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import * as BaseUrl from 'routes/BaseUrl.jsx';
import navbarsStyle from "assets/jss/material-kit-pro-react/views/navbarsStyle.jsx";
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logout, register } from 'store/actions/auth/auth.jsx';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    register: (creds) => dispatch(register(creds))
});

const NavBar = (props) => {
    const { classes, navs, history, auth, changeLocale } = props;
    const { t, i18n } = useTranslation();

    const exit = () => {
        localStorage.clear();
        props.logout();
        history.push(BaseUrl.loginUrl);
    }

    const navItems = navs.map(nav => {
        let className = classes.navLink;
        if (window.location.pathname.startsWith(nav.url) && 
            nav.url !== BaseUrl.homeUrl) {
            className += " " + classes.navLinkActive;
        }
        if (window.location.pathname === BaseUrl.homeUrl &&
            nav.url === BaseUrl.homeUrl) {
            className += " " + classes.navLinkActive;
        }
        let item = (
            <ListItem className={classes.listItem} key={nav.url}>
                <Button
                    to={nav.url}
                    className={className}
                    color='transparent'
                    component={NavLink}
                >
                    {nav.title}
                </Button>
            </ListItem>
        );
        return item;
    });

    const Account = () => {
        if (auth.isAuthenticated) {
            return (
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                        noLiPadding
                        navDropDown
                        hoverColor='primary'
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        buttonIcon={AccountCircle}
                        dropdownList={[
                            <Button
                                to={BaseUrl.profileUrl}
                                color='transparent'
                                className={classes.navButton}
                                component={NavLink}
                                fullWidth
                                round
                            >
                                Profile
                            </Button>,
                            <Button
                                color='transparent'
                                className={classes.navButton}
                                onClick={() => exit()}
                                fullWidth
                                round
                            >
                                Exit
                            </Button>
                        ]}
                    />
                </ListItem>
            );
        } else {
            return (
                <ListItem className={classes.listItem}>
                    <Button
                        to={BaseUrl.signupUrl}
                        color={window.innerWidth < 960 ? "info" : "white"}
                        className={classes.navButton}
                        component={NavLink}
                        round
                    >
                        {t('header.signup')}
                    </Button>
                </ListItem>
            );
        }
    }

    const LanguageItem = () => {
        return (
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    navDropDown
                    hoverColor='primary'
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Language}
                    dropdownList={[
                        <Button
                            color='transparent'
                            className={classes.navButton}
                            onClick={() => changeLocale('cn')}
                            fullWidth
                            round
                        >
                            {t('header.cn')}
                        </Button>,
                        <Button
                            color='transparent'
                            className={classes.navButton}
                            onClick={() => changeLocale('en')}
                            fullWidth
                            round
                        >
                            {t('header.en')}
                        </Button>
                    ]}
                />
            </ListItem>
        );
    }

    return (
        <List className={classes.list + " " + classes.mlAuto}>
            {navItems}
            <Account />
            <LanguageItem />
        </List>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(navbarsStyle)(NavBar)));