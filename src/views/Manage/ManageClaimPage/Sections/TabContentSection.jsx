import React, { useReducer, useEffect } from 'react';
import clsx from 'clsx';
import logger from 'use-reducer-logger';
import tableReducer from 'redux/reducers/tableReducer';
import * as TableActions from 'redux/actions/manageClaim/table/tableActions.jsx';

import { Toolbar, Tooltip, IconButton, Typography, TableHead, TableRow,
    TableCell, Checkbox, Paper } from '@material-ui/core';
import { Assignment as AssignmentIcon, Done as DoneIcon } from '@material-ui/icons';

import EnhancedTable from 'views/Manage/ManageClaimPage/Sections/EnhancedTable.jsx';
import EnhancedPagination from 'components/Pagination/EnhancedPagination.jsx';
import Button from "components/CustomButtons/Button.jsx";

const EnhancedTableToolbar = ({ ...props }) => {
    const {
        t,
        classes,
        numSelected,
        selectedText,
        tableType,
        title
    } = props;

    return (
        <Toolbar
            className={clsx(classes.toolbarRoot, {
                [classes.toolbarHighlight]: numSelected > 0
            })}
        >
            <div className={classes.toolbarTitle}>
                {numSelected > 0 ? (
                    <Typography color='inherit' variant='subtitle1'>
                        {`${numSelected} ${selectedText}`}
                    </Typography>
                ) : (
                    <Typography variant='h6'>
                        {title}
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 && tableType === 'pending' && (
                    <Tooltip title="Assignment">
                        <IconButton aria-label={t('manageClaimPage.table.assign')}>
                            <AssignmentIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {numSelected > 0 && tableType === 'processing' && (
                    <Tooltip title="Done">
                        <IconButton aria-label='Done'>
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};


const initialState = {
    data: [],
    page: 0,
    rowsPerPage: 5,
    pageData: [],
    selected: [],
    order: 'desc',
    orderBy: '_id',
};

const TabContentSection = ({ ...props }) => {
    const {
        classes,
        claims,
        t,
        history,
        tableType
    } = props;

    const [state, dispatch] = useReducer(logger(tableReducer), initialState);
    const { data, page, rowsPerPage, pageData, selected, order, orderBy } = state;

    useEffect(() => {console.log('Mount: Tab content section');}, []);

    useEffect(() => {
        if (claims.length !== 0) {
            dispatch(TableActions.loadData(claims));
            dispatch(TableActions.sortData());
        }
    }, [claims]);

    useEffect(() => {
        dispatch(TableActions.sortData());
    }, [state.order, state.orderBy]);

    useEffect(() => {
        if (data.length !== 0) {
            dispatch(TableActions.updatePageData());
        }
    }, [page, rowsPerPage, order, orderBy, data]);

    const headRows = [
        { id: '_id', label: t('manageClaimPage.table.claimId') },
        { id: 'date', label: t('manageClaimPage.table.date') },
        { id: 'amount', label: t('manageClaimPage.table.amount') },
        { id: 'status', label: t('manageClaimPage.table.status') },
        { label: '' }
    ];

    return (
        <div className={classes.tableRoot}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    t={t}
                    classes={classes}
                    numSelected={selected.length}
                    selectedText={t('manageClaimPage.table.selectedText')}
                    tableType={tableType}
                    title={t(`manageClaimPage.table.${tableType}`)}
                />
                <EnhancedTable
                    t={t}
                    className={classes.table}
                    headRows={headRows}
                    selected={selected}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    content={pageData}
                    order={order}
                    orderBy={orderBy}
                    changeOrder={(orderBy) => dispatch(TableActions.changeOrder(orderBy))}
                    flipPage={(page) => dispatch(TableActions.flipPage(page))}
                    addSelected={(selectedArray) => dispatch(TableActions.addSelected(selectedArray))}
                    removeSelected={(selectedArray) => dispatch(TableActions.removeSelected(selectedArray))}
                />
                <EnhancedPagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    size={claims.length}
                    flipPage={(page) => dispatch(TableActions.flipPage(page))}
                />
            </Paper>
        </div>
    );
};

export default TabContentSection;