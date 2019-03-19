import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {

    render() {

        return (
            <div>
                <Header />
                <br />
                {"this is body part"}
                <Footer />
            </div>
        );
    }
}

export default Main;