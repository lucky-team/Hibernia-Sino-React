import React, { Component } from 'react';
import Header from './common/HeaderComponent';
import Footer from './common/FooterComponent';
import ClaimApplication from './customer/claim/ClaimApplication';
import Insurance from './customer/InsuranceComponent';
import EmployeeClaim from './employee/claim/EmployeeClaimComponent';
import { loginUser, logoutUser, fetchInsurances, fetchClaims, postClaim } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as BaseUrl from '../shared/BaseUrl';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        insurances: state.insurances,
        claims: state.claims
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchInsurances: () => dispatch(fetchInsurances()),
    fetchClaims: () => dispatch(fetchClaims()),
    postClaim: (claim) => dispatch(postClaim(claim))
});

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentInsurance: '',
            isDetailsOpen: true,
            insurance: null
        }
        this.changeCurrentInsurance = this.changeCurrentInsurance.bind(this);
    }

    handleDetailsOpen = () => {
        this.setState({ isDetailsOpen: true });
    };

    handleDetailsClose = () => {
        this.setState({ isDetailsOpen: false });
    };

    changeCurrentInsurance(insuranceId) {
    this.setState(state => ({
            currentInsurance: insuranceId,
        }));
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.employee) {
                this.props.fetchClaims();
            } else {
                this.props.fetchInsurances();
            }
        }
    }

    render() {
        const InsurancesPage = () => {
            return (
                <Insurance
                    insurances={this.props.insurances.insurances}
                    insurancesLoading={this.props.insurances.isLoading}
                    insurancesErrMess={this.props.insurances.errMess}
                    auth={this.props.auth}
                    changeCurrentInsurance={this.changeCurrentInsurance}
                />
            );
        }

        const ClaimApplicationPage = () => {
            return (
                <ClaimApplication
                    postClaim={this.props.postClaim}
                    currentInsurance={this.state.currentInsurance}
                />
            );
        }

        const EmployeeClaimPage = () => {
            return (
                <EmployeeClaim
                    claims={this.props.claims}
                    claimsLoading={this.props.claims.isLoading}
                    claimsErrMess={this.props.claims.errMess}
                    fetchClaims={this.props.fetchClaims}
                    auth={this.props.auth}
                />
            );
        }

        return (
            <div>
                <Header
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                    auth={this.props.auth}
                />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route exact path={BaseUrl.myServicesPath} component={InsurancesPage} />
                            <Route path={BaseUrl.claimApplicationPath} component={ClaimApplicationPage} />
                            <Route path={BaseUrl.employeeClaim} component={EmployeeClaimPage} />
                            <Redirect to={BaseUrl.myServicesPath} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                {/* <Footer /> */}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
// export default Main;