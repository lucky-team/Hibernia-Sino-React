import React, { Component } from 'react';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router-dom';
import Table from '../../common/Table';
import * as BaseUrl from '../../../shared/BaseUrl';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        paddingTop: theme.spacing.unit * 5,
    }
})

const setMode = () => {
    let pathname = window.location.pathname;
    switch(pathname) {
        case BaseUrl.employeeClaim:
            return 'all';
        case BaseUrl.employeeClaimPending:
            return 'pending';
        case BaseUrl.employeeClaimProcessing:
            return 'processing';
        case BaseUrl.employeeClaimClosed:
            return 'closed';
        default:
            return 'all';
    }
}

class EmployeeClaim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: setMode() // all, pending, processing, closed
        }
    }

    render() {
        const { classes, claims, auth } = this.props;

        if (auth.isAuthenticated && auth.employee) {

            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <Table
                        fetchClaims={this.props.fetchClaims}
                        mode={this.state.mode}
                        titleText={"claim " + this.state.mode + " list"}
                        claims={claims} />
                </div>
            );
        } else {
            return (
                <Redirect to={BaseUrl.homePath} />
            );
        }

        
    }
}

export default withRouter(withStyles(styles)(EmployeeClaim));