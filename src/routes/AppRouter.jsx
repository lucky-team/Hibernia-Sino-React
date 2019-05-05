import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from 'routes/PrivateRoute.jsx';
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
import ManageClaim from 'views/Manage/ManageClaimPage/ManageClaimPage.jsx';
import Notifier from 'views/notifier.jsx';

var history = createHistory();

class AppRouter extends Component {
    componentDidMount() {
        console.log('Mount: App router');
        const { auth, fetchProfiles, fetchInsurances, fetchClaims } = this.props;
        if (auth.isAuthenticated) {
            fetchProfiles();
            fetchInsurances();
            fetchClaims();
        }
    }

    render () {
        const { register, login, auth, fetchProfiles, profile, createProfile,
            updateProfile, insurance, fileClaim, claim, changeLocale, fetchInsurances,
            enqueueSnackbar } = this.props;
             
        const SignupPage = ({ ...props }) => (
            <Signup
                register={register}
                changeLocale={changeLocale}
                auth={auth}
                enqueueSnackbar={enqueueSnackbar}
                {...props}
            />
        );
        
        const LoginPage = ({ ...props }) => (
            <Login
                login={login}
                auth={auth}
                changeLocale={changeLocale}
                enqueueSnackbar={enqueueSnackbar}
                {...props}
            />
        );

        const ProfilePage = ({ ...props }) => (
            <Profile
                profile={profile}
                createProfile={createProfile}
                updateProfile={updateProfile}
                changeLocale={changeLocale}
                {...props}
            />
        );

        const InsurancePage = ({ ...props }) => (
            <Insurance
                insurance={insurance}
                changeLocale={changeLocale}
                {...props}
            />
        );

        const ClaimProcessPage = ({ ...props }) => (
            <ClaimProcess
                fileClaim={fileClaim}
                changeLocale={changeLocale}
                {...props}
            />
        );

        const ClaimPage = ({ ...props }) => (
            <Claim
                insurance={insurance}
                claim={claim}
                changeLocale={changeLocale}
                {...props}
            />
        );

        const ManageClaimPage = ({ ...props }) => (
            <ManageClaim
                changeLocale={changeLocale}
                insurance={insurance}
                claim={claim}
                fetchInsurances={fetchInsurances}
                {...props}
            />
        )

        return (
            <div>
                <Notifier />
                <Router history={history}>
                    <Switch>
                        <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                        <Route exact path={BaseUrl.loginUrl} component={LoginPage} />
                        <PrivateRoute exact path={BaseUrl.profileUrl} component={ProfilePage} />
                        <PrivateRoute exact path={BaseUrl.myInsurancesUrl} component={InsurancePage} />
                        <PrivateRoute exact path={BaseUrl.myClaimsUrl} component={ClaimPage} />
                        <PrivateRoute exact path={BaseUrl.claimProcessUrl} component={ClaimProcessPage} />
                        <PrivateRoute exact path={BaseUrl.manageClaimsUrl} component={ManageClaimPage} />
                        <Redirect to={BaseUrl.manageClaimsUrl} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);