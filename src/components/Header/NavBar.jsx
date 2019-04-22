import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from 'components/CustomButtons/Button.jsx';
import * as BaseUrl from 'assets/BaseUrl.jsx';
import navbarsStyle from "assets/jss/material-kit-pro-react/views/navbarsStyle.jsx";

const NavBar = (props) => {
    const { classes, navs } = props;

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

    return (
        <List className={classes.list + " " + classes.mlAuto}>
            {navItems}
        </List>
    );
}

export default withStyles(navbarsStyle)(NavBar);