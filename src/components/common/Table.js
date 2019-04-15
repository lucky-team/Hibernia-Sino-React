import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Table, TableBody, TableCell, TableHead, TablePagination, TableRow,
    TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import * as BaseUrl from '../../shared/BaseUrl';
import * as Utils from '../../shared/Utils';
import DetailedClaim from './DetailedClaimComponent';
import { SnackbarProvider, withSnackbar } from 'notistack';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, rows } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes, titleText } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                    ) : (
                    <Typography variant="h6" id="tableTitle">
                        {titleText}
                    </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const generateTableData = (claims, mode) => {
    let data = claims.filter(claim => {
        if (mode === 'all') {
            return true;
        } else if (mode === 'closed') {
            return claim.status === 'accepted' || claim.status === 'rejected';
        } else {
            return claim.status === mode;
        }
    }).map(claim => {
        let claimDate = Utils.parseISODate(claim.date);
        let createdAt = Utils.parseISODate(claim.createdAt);
        let row = [claim._id, claim.insurance, claim.location, claim.amount, claimDate, createdAt, claim.status ]
        return row;
    })
    return data;
}

const DetailedClaimWithSnackBar = withSnackbar(DetailedClaim);

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 0,
            selected: [],
            page: 0,
            rowsPerPage: 5,
            isDetailsOpen: false,
            claims: this.props.claims,
            data: null
        };
    }

    componentDidMount() {
        if (this.state.claims) {
            this.setState({
                data: generateTableData(this.state.claims.claims, this.props.mode)
            });
        }
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n[0]) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleItemClick = (event, claimId, insuranceId) => {
        this.fetchInsurance(insuranceId);
        let claim;
        for (var i = 0; i < this.props.claims.claims.length; i++) {
            if (this.props.claims.claims[i]._id === claimId) {
                claim = this.props.claims.claims[i];
                i = this.props.claims.claims.length;
            }
        }
        if (claim === null) {
            alert('Cannot find claim: ' + claimId);
        }
        this.setState({
            isDetailsOpen: true,
            claim: claim,
        });
    }

    handleCheckClick = (event, id) => {
        event.stopPropagation();
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleDetailsOpen = () => {
        this.setState({ isDetailsOpen: true });
    };

    handleDetailsClose = () => {
        this.setState({
            isDetailsOpen: false,
            insurance: null,
            claim: null
        });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    fetchInsurance = (insuranceId) => {
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

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, titleText } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        if (data) {
            const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
            const rows = [
                { id: 0, numeric: false, disablePadding: true, label: 'Claim Id' },
                { id: 1, numeric: true, disablePadding: false, label: 'Insurance Id' },
                { id: 2, numeric: true, disablePadding: false, label: 'Claim location' },
                { id: 3, numeric: true, disablePadding: false, label: 'Claim Amount' },
                { id: 4, numeric: true, disablePadding: false, label: 'Accident Date' },
                { id: 5, numeric: true, disablePadding: false, label: 'Apply Date' },
                { id: 6, numeric: true, disablePadding: false, label: 'Status' },
            ];
            return (
                <Paper className={classes.root}>
                    <EnhancedTableToolbar titleText={titleText} numSelected={selected.length} />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                rows={rows}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n[0]);
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleItemClick(event, n[0], n[1])}
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n[0]}
                                                selected={isSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheckClick(event, n[0])}
                                                        checked={isSelected} />
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none">
                                                    {n[0]}
                                                </TableCell>
                                                {n.slice(1).map((item, index) => (
                                                    <TableCell align="right" key={index}>{item}</TableCell>
                                                ))}
                                                
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <SnackbarProvider maxSnack={3}>
                            <DetailedClaimWithSnackBar
                                fetchClaims={this.props.fetchClaims}
                                insurance={this.state.insurance}
                                claim={this.state.claim}
                                handleClickOpen={this.handleDetailsOpen}
                                handleClose={this.handleDetailsClose}
                                open={this.state.isDetailsOpen}
                            />
                        </SnackbarProvider>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            );
        } else {
            return (<div></div>);
        }
        
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);