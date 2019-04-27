import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { register, login } from 'store/actions/auth/auth.jsx';
import { fetchProfiles, createProfile, updateProfile } from 'store/actions/profile/profile.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import Signup from 'views/SignupPage/SignupPage.jsx';
import Login from 'views/LoginPage/LoginPage.jsx';
import Profile from 'views/ProfilePage/ProfilePage.jsx';

var history = createHistory();

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

const mapDispatchToProps = dispatch => ({
    register: (creds) => dispatch(register(creds)),
    login: (creds) => dispatch(login(creds)),
    fetchProfiles: (query) => dispatch(fetchProfiles(query)),
    createProfile: (profile) => dispatch(createProfile(profile)),
    updateProfile: (profile) => dispatch(updateProfile(profile))
});

class AppRouter extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.fetchProfiles(null);
        }
        console.log('Mount: App router');
    }

    render () {
        const { register, login, auth, fetchProfiles, profile, createProfile, updateProfile } = this.props;

        const SignupPage = () => (
            <Signup register={register} auth={auth} />
        );
        
        const LoginPage = () => (
            <Login login={login} auth={auth} />
        );

        const ProfilePage = () => (
            <Profile
                profile={profile}
                fetchProfiles={fetchProfiles}
                createProfile={createProfile}
                updateProfile={updateProfile}
            />
        );

        return (
            <Router history={history}>
                <Switch>
                    <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                    <Route exact path={BaseUrl.loginUrl} component={LoginPage} />
                    <Route exact path={BaseUrl.profileUrl} component={ProfilePage} />
                    <Redirect to={BaseUrl.profileUrl} />
                </Switch>
            </Router>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);