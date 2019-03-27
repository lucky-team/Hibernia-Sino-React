import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Claim from './claim/ClaimComponent';
import Signin from './Signin';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class Main extends Component {

    render() {
        return (
            <div>
                <Header />
                <br />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            {/* <Route path="/claims" component={Claim} /> */}
                            <Route path="/sigin" component={Signin} />
                            <Redirect to="/sigin" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);