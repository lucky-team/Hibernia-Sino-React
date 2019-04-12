import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ClaimApplication from './customer/claim/ClaimApplication';
import Insurance from './customer/InsuranceComponent';
import { loginUser, logoutUser, fetchInsurances, fetchClaims, postClaim } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Table from './common/Table'
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
            currentInsurance: ''
        }
        this.changeCurrentInsurance = this.changeCurrentInsurance.bind(this);
    }

    changeCurrentInsurance(insuranceId) {
        this.setState(state => ({
            currentInsurance: insuranceId,
        }));
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.fetchInsurances();
            this.props.fetchClaims();
        }
    }

    render() {
        const InsurancesPage = () => {
            return (
                <Insurance insurances={this.props.insurances.insurances}
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

        const heads = ['clientId', 'location', 'amount', 'insured', 'date', 'operation'];
        
        return (
            <div>
                <Header 
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                    auth={this.props.auth}
                />
                {/* <Table heads={heads} /> */}
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route exact path={BaseUrl.myServicesPath} component={InsurancesPage} />
                            <Route path={BaseUrl.claimApplicationPath} component={ClaimApplicationPage} />
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