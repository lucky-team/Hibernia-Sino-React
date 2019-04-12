import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(clientId, location, amount, insured, date, status) {
  id += 1;
  return [ clientId, location, amount, insured, date, status ];
}

const rows = [
  createData('5ca983aa2b1fa93fe0045257', 'Pingleyuan Beijing', 3000, 'Smith Jobs', '2018-09-21', 'pending'),
  createData('53257aa2fa93fe004ca985b1', 'Pingleyuan Beijing', 1000, 'Smith Jobs', '2018-09-21', 'pending'),
  createData('83a2bfa93ca97a1fe0045255', 'Pingleyuan Beijing', 20, 'Smith Jobs', '2018-09-21', 'accepted'),
  createData('5cafe7aa2b12598004533fa9', 'Pingleyuan Beijing', 3000000, 'Smith Jobs', '2018-09-21', 'rejected'),
  createData('fa93e0452583fa95c7a0a2b1', 'Pingleyuan Beijing', 10000, 'Smith Jobs', '2018-09-21', 'processing'),
];

function CustomizedTable(props) {
  const { classes, heads } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>{heads[0]}</CustomTableCell>
            {heads.slice(1).map((head) => (
              <CustomTableCell align="right">{head}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row[0]}
              </CustomTableCell>
              {row.slice(1).map(value => (
                value === 'pending' ?
                
                <CustomTableCell align="right"><Button variant="outlined">Process</Button></CustomTableCell>
                :
                <CustomTableCell align="right">{value}</CustomTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);