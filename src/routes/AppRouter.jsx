import React, { useState } from 'react';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import "assets/scss/material-kit-pro-react.scss?v=1.3.0";
import Header from 'views/Header.jsx';

var hist = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={hist}>
            <Switch>
                <Route path='/' component={Header} />
                {/* <Redirect to='/' /> */}
            </Switch>
        </Router>
    );
};

export default AppRouter;