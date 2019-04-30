import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { register, login } from 'store/actions/auth/auth.jsx';
import { fetchProfiles, createProfile, updateProfile } from 'store/actions/profile/profile.jsx';
import { fetchInsurances } from 'store/actions/insurance/insurance.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import Signup from 'views/SignupPage/SignupPage.jsx';
import Login from 'views/LoginPage/LoginPage.jsx';
import Profile from 'views/ProfilePage/ProfilePage.jsx';
import Insurance from 'views/InsurancePage/InsurancePage.jsx';
import ClaimProcess from 'views/ClaimProcessPage/ClaimProcessPage.jsx';

var history = createHistory();

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile,
        insurance: state.insurance
    }
}

const mapDispatchToProps = dispatch => ({
    register: (creds) => dispatch(register(creds)),
    login: (creds) => dispatch(login(creds)),
    fetchProfiles: (query) => dispatch(fetchProfiles(query)),
    createProfile: (profile) => dispatch(createProfile(profile)),
    updateProfile: (profile) => dispatch(updateProfile(profile)),
    fetchInsurances: (query) => dispatch(fetchInsurances(query))
});

class AppRouter extends Component {
    componentDidMount() {
        const { auth, fetchProfiles, fetchInsurances} = this.props;
        if (auth.isAuthenticated) {
            fetchProfiles();
            fetchInsurances();
        }
        console.log('Mount: App router');
    }

    render () {
        const { register, login, auth, fetchProfiles, profile, createProfile,
            updateProfile, insurance, fetchInsurances } = this.props;

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

        const InsurancePage = () => (
            <Insurance
                insurance={insurance}
                fetchInsurances={fetchInsurances}
            />
        );

        const ClaimProcessPage = () => (
            <ClaimProcess

            />
        );

        return (
            <Router history={history}>
                <Switch>
                    <Route exact path={BaseUrl.signupUrl} component={SignupPage} />
                    <Route exact path={BaseUrl.loginUrl} component={LoginPage} />
                    <Route exact path={BaseUrl.profileUrl} component={ProfilePage} />
                    <Route exact path={BaseUrl.myInsurancesUrl} component={InsurancePage} />
                    <Route exact path={BaseUrl.claimProcessUrl} component={ClaimProcessPage} />
                    <Redirect to={BaseUrl.claimProcessUrl} />
                </Switch>
            </Router>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);