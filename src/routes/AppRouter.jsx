import React from 'react';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";
import Signup from 'views/SignupPage/SignupPage.jsx';
import { connect } from 'react-redux';
import { register } from 'store/actions/auth.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';

var hist = createBrowserHistory();

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: (creds) => dispatch(register(creds))
});

const AppRouter = ({ ...props }) => {
    const { register, auth } = props;

    const SignupPage = () => (
        <Signup register={register} auth={auth} />
    );
    
    return (
        <Router history={hist}>
            <Switch>
                <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                <Redirect to={BaseUrl.signupUrl} />
            </Switch>
        </Router>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);