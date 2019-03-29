import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Insurance from './InsuranceComponent';
import { loginUser, logoutUser, fetchInsurances } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        insurances: state.insurances
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    fetchInsurances: () => dispatch(fetchInsurances())
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchInsurances();
    }

    render() {
        const InsurancesPage = () => {
            return (
                <Insurance insurances={this.props.insurances.insurances}
                    insurancesLoading={this.props.insurances.isLoading}
                    insurancesErrMess={this.props.insurances.errMess}
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
                            <Route path="/purchased_insurances" component={InsurancesPage} />
                            <Redirect to="/purchased_insurances" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
// export default Main;