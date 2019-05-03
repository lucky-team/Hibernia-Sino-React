import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { register, login } from 'redux/actions/auth/auth.jsx';
import { fetchProfiles, createProfile, updateProfile } from 'redux/actions/profile/profile.jsx';
import { fetchInsurances } from 'redux/actions/insurance/insurance.jsx';
import { fileClaim, fetchClaims } from 'redux/actions/claim/claim.jsx';
import { removeSnackbar, enqueueSnackbar } from 'redux/actions/notification/notification.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import Signup from 'views/SignupPage/SignupPage.jsx';
import Login from 'views/LoginPage/LoginPage.jsx';
import Profile from 'views/ProfilePage/ProfilePage.jsx';
import Insurance from 'views/InsurancePage/InsurancePage.jsx';
import ClaimProcess from 'views/ClaimProcessPage/ClaimProcessPage.jsx';
import Claim from 'views/ClaimPage/ClaimPage.jsx';
import Notifier from 'views/notifier.jsx';
import { Button } from '@material-ui/core';

var history = createHistory();

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile,
        insurance: state.insurance,
        claim: state.claim,
        notifications: state.notification.notifications
    }
}

const mapDispatchToProps = dispatch => ({
    register: (creds, history) => dispatch(register(creds, history)),
    login: (creds, history) => dispatch(login(creds, history)),
    fetchProfiles: (query) => dispatch(fetchProfiles(query)),
    createProfile: (profile) => dispatch(createProfile(profile)),
    updateProfile: (profile) => dispatch(updateProfile(profile)),
    fetchInsurances: (query) => dispatch(fetchInsurances(query)),
    fileClaim: (claim) => dispatch(fileClaim(claim)),
    fetchClaims: (query) => dispatch(fetchClaims(query)),
    removeSnackbar: (key) => dispatch(removeSnackbar(key)),
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification))
});

class AppRouter extends Component {
    componentDidMount() {
        const { auth, fetchProfiles, fetchInsurances, fetchClaims } = this.props;
        if (auth.isAuthenticated) {
            fetchProfiles();
            fetchInsurances();
            fetchClaims();
        }
        console.log('Mount: App router');
    }

    render () {
        const { t, register, login, auth, fetchProfiles, profile, createProfile,
            updateProfile, insurance, fileClaim, claim, changeLocale,
             notifications, removeSnackbar, enqueueSnackbar } = this.props;

        const SignupPage = () => (
            <Signup
                register={register}
                auth={auth}
                changeLocale={changeLocale}
            />
        );
        
        const LoginPage = () => (
            <Login
                login={login}
                t={t}
                auth={auth}
                changeLocale={changeLocale}
            />
        );

        const ProfilePage = () => (
            <Profile
                profile={profile}
                fetchProfiles={fetchProfiles}
                createProfile={createProfile}
                updateProfile={updateProfile}
                changeLocale={changeLocale}
                enqueueSnackbar={enqueueSnackbar}
                auth={auth}
            />
        );

        const InsurancePage = () => (
            <Insurance
                insurance={insurance}
                changeLocale={changeLocale}
                enqueueSnackbar={enqueueSnackbar}
                auth={auth}
            />
        );

        const ClaimProcessPage = () => (
            <ClaimProcess
                fileClaim={fileClaim}
                changeLocale={changeLocale}
            />
        );

        const ClaimPage = () => (
            <Claim
                insurance={insurance}
                claim={claim}
                changeLocale={changeLocale}
                enqueueSnackbar={enqueueSnackbar}
                auth={auth}
            />
        );

        return (
            <div>
                <Notifier
                    removeSnackbar={removeSnackbar}
                    notifications={notifications}
                    enqueueSnackbar={enqueueSnackbar}
                />
                <Router history={history}>
                    <Switch>
                        <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                        <Route exact path={BaseUrl.loginUrl} component={LoginPage} />
                        <Route exact path={BaseUrl.profileUrl} component={ProfilePage} />
                        <Route exact path={BaseUrl.myInsurancesUrl} component={InsurancePage} />
                        <Route exact path={BaseUrl.myClaimsUrl} component={ClaimPage} />
                        <Route exact path={BaseUrl.claimProcessUrl} component={ClaimProcessPage} />
                        <Redirect to={BaseUrl.myClaimsUrl} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);