import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '80%',
        overflowX: 'auto',
        margin: 'auto',
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 700,
    },
});

class SimpleTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            insurances: this.props.insurances
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Insurance ID</TableCell>
                            <TableCell align="center">Insured Name</TableCell>
                            <TableCell align="center">Plan</TableCell>
                            <TableCell align="center">Level</TableCell>
                            <TableCell align="center">Expire Date</TableCell>
                            <TableCell align="center">Operation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.insurances.map(insurance => (
                            <TableRow key={insurance._id}>
                                <TableCell component="th" scope="row" align="center">
                                    {insurance._id}
                                </TableCell>
                                <TableCell align="center">{`${insurance.insured.firstname} ${insurance.insured.lastname}`}</TableCell>
                                <TableCell align="center">{insurance.plan}</TableCell>
                                <TableCell align="center">{insurance.level}</TableCell>
                                <TableCell align="center">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(insurance.expireDate)))}</TableCell>
                                <TableCell align="center"><Button variant='contained'>Claim</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);