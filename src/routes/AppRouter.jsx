import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { connect } from 'react-redux';
import { register, login } from 'store/actions/auth.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import Signup from 'views/SignupPage/SignupPage.jsx';
import Login from 'views/LoginPage/LoginPage.jsx';

var hist = createBrowserHistory();

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: (creds) => dispatch(register(creds)),
    login: (creds) => dispatch(login(creds))
});

const AppRouter = ({ ...props }) => {
    const { register, login, auth } = props;

    const SignupPage = () => (
        <Signup register={register} auth={auth} />
    );
    
    const LoginPage = () => (
        <Login login={login} auth={auth} />
    )

    return (
        <Router history={hist}>
            <Switch>
                <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                <Route exact path={BaseUrl.loginUrl} component={LoginPage} />
                <Redirect to={BaseUrl.loginUrl} />
            </Switch>
        </Router>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);