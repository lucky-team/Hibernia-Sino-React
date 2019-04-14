import React, { Component } from 'react';
import classNames from 'classnames';
import { Paper, Typography, CssBaseline, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router-dom';

import DetailedInsurance from '../../common/DetailedInsuranceComponent';
import Table from '../../common/Table';
import * as BaseUrl from '../../../shared/BaseUrl';
import * as Utils from '../../../shared/Utils';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        paddingTop: theme.spacing.unit * 5,
    }
})

const generateTableData = claims => {
    let data = claims.map(claim => {
        let claimDate = Utils.parseISODate(claim.date);
        let createdAt = Utils.parseISODate(claim.createdAt);
        let row = [claim._id, claim.insurance, claim.location, claim.amount, claimDate, createdAt, claim.status ]
        return row;
    })
    return data;
}
  
const rows = [
    { id: 0, numeric: false, disablePadding: true, label: 'Claim Id' },
    { id: 1, numeric: true, disablePadding: false, label: 'Insurance Id' },
    { id: 2, numeric: true, disablePadding: false, label: 'Claim location' },
    { id: 3, numeric: true, disablePadding: false, label: 'Claim Amount' },
    { id: 4, numeric: true, disablePadding: false, label: 'Accident Date' },
    { id: 5, numeric: true, disablePadding: false, label: 'Apply Date' },
    { id: 6, numeric: true, disablePadding: false, label: 'Status' },
];

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
            mode: setMode(), // all, pending, processing, closed
            tableData:  generateTableData(this.props.claims.claims),
            insurance: null
        }
    }

    fetchInsurance = () => {
        let insuranceId = this.props.claims.claims[0].insurance;
        const bearer = 'Bearer ' + localStorage.getItem('token');

        fetch(BaseUrl.baseUrl + 'insurances?_id=' + insuranceId, {
            headers: {  
                'Authorization': bearer
            }
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(insurance => {
            if (insurance.length !== 0) {
                this.setState({
                    insurance: insurance[0]
                });
            } else {
                alert(JSON.parse(insurance));
            }
            
        })
        .catch(error => alert(error.message));
    }

    render() {
        const { classes, claims, auth } = this.props;

        if (auth.isAuthenticated && auth.employee) {

            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <Table
                        titleText="Claim Pending List"
                        data={this.state.tableData}
                        rows={rows} />
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