import React, { Component } from 'react';
import classNames from 'classnames';
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../common/Table';


const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 5,
        paddingTop: theme.spacing.unit * 5,
    }
})

function createData(claimId, name, calories, fat, carbs, protein) {
    return [ claimId, name, calories, fat, carbs, protein ];
}

const data = [
    createData('5cb01012f79e586a7f235a90', 'Cupcake', 305, 3.7, 67, 'pending'),
    createData('5cb01012f79e586a7f235a91', 'Donut', 452, 25.0, 51, 'pending'),
    createData('5cb01012f79e586a7f235a92', 'Eclair', 262, 16.0, 24, 'pending'),
    createData('5cb01012f79e586a7f235a93', 'Frozen yoghurt', 159, 6.0, 24, 'pending'),
    createData('5cb01012f79e586a7f235a94', 'Gingerbread', 356, 16.0, 49, 'pending'),
    createData('5cb01012f79e586a7f235a95', 'Honeycomb', 408, 3.2, 87, 'pending'),
    createData('5cb01012f79e586a7f235a96', 'Ice cream sandwich', 237, 9.0, 37, 'pending'),
    createData('5cb01012f79e586a7f235a97', 'Jelly Bean', 375, 0.0, 94, 'pending'),
    createData('5cb01012f79e586a7f235a98', 'KitKat', 518, 26.0, 65, 'pending'),
    createData('5cb01012f79e586a7f235a99', 'Lollipop', 392, 0.2, 98, 'pending'),
    createData('5cb01012f79e586a7f235b00', 'Marshmallow', 318, 0, 81, 'pending'),
    createData('5cb01012f79e586a7f235b01', 'Nougat', 360, 19.0, 9, 'pending'),
    createData('5cb01012f79e586a7f235b02', 'Oreo', 437, 18.0, 63, 'pending'),
  ];

  
const rows = [
    { id: 0, numeric: false, disablePadding: true, label: 'ClaimId' },
    { id: 1, numeric: true, disablePadding: false, label: 'Reason' },
    { id: 2, numeric: true, disablePadding: false, label: 'Amount' },
    { id: 3, numeric: true, disablePadding: false, label: 'Expire' },
    { id: 4, numeric: true, disablePadding: false, label: 'Created At' },
    { id: 5, numeric: true, disablePadding: false, label: 'Status' },
];

class EmployeeClaimPending extends Component {
    

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography variant="h6" color="inherit">Claim</Typography>
                    <Table
                        data={data}
                        rows={rows} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(EmployeeClaimPending);