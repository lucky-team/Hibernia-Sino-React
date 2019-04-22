import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import "assets/scss/material-kit-pro-react.scss?v=1.3.0";
import SignupPage from 'views/SignupPage/SignupPage.jsx';

var hist = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={hist}>
            <Switch>
                <Route exact path='/' component={SignupPage} />
                <Redirect to='/' />
            </Switch>
        </Router>
    );
};

export default AppRouter;