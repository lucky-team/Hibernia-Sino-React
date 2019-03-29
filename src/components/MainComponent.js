import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Signin from './Signin';
import { loginUser, logoutUser } from '../redux/ActionCreator';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {

    render() {
        
        return (
            <div>
                <Header 
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                    auth={this.props.auth}
                />
                {/* <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/sigin" component={SigninPage} />
                            <Redirect to="/sigin" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup> */}
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
// export default Main;