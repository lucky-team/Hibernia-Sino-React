import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Loading from '../common/Loading';
import { baseUrl } from '../../shared/baseUrl';

const styles = theme => ({

});

class Claim extends Component {
    state = {
        loading: true,
        insurances: []
    }

    fetchInsurances() {
        let data = fetch(baseUrl + 'insurances', {
            method: 'GET'
        })
    }
}


export default Claim;