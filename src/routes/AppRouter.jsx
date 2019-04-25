import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import { connect } from 'react-redux';
import { register, login } from 'store/actions/auth/auth.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import Signup from 'views/SignupPage/SignupPage.jsx';
import Login from 'views/LoginPage/LoginPage.jsx';
import Profile from 'views/ProfilePage/ProfilePage.jsx';

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
    );

    const ProfilePage = () => (
        <Profile />
    );

    return (
        <Router history={hist}>
            <Switch>
                <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                <Route exact path={BaseUrl.loginUrl} component={LoginPage} />
                <Route exact path={BaseUrl.profileUrl} component={ProfilePage} />
                <Redirect to={BaseUrl.profileUrl} />
            </Switch>
        </Router>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);