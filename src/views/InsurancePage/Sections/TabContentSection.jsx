import React, { useReducer, useEffect } from 'react';
import clsx from 'clsx';
import logger from 'use-reducer-logger';
import tableReducer from 'redux/reducers/tableReducer';
import * as TableActions from 'redux/actions/table/tableActions.jsx';

import { Toolbar, Tooltip, IconButton, Typography, Paper } from '@material-ui/core';
import { Assignment as AssignmentIcon, Done as DoneIcon } from '@material-ui/icons';

import EnhancedTable from 'views/InsurancePage/Sections/EnhancedTable.jsx';
import EnhancedPagination from 'components/Pagination/EnhancedPagination.jsx';

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
        insurances,
        t,
        tableType,
        enqueueSnackbar,
        history
    } = props;

    const [state, dispatch] = useReducer(logger(tableReducer), initialState);
    const { data, page, rowsPerPage, pageData, selected, order, orderBy } = state;

    useEffect(() => {console.log('Mount: Tab content section');}, []);

    useEffect(() => {
        dispatch(TableActions.loadData(insurances));
        dispatch(TableActions.sortData());
    }, [insurances]);

    useEffect(() => {
        dispatch(TableActions.sortData());
    }, [state.order, state.orderBy]);
    
    useEffect(() => {
        dispatch(TableActions.updatePageData());
    }, [page, rowsPerPage, order, orderBy, data]);

    const headRows = [
        { id: '_id', label: t('insuranceDetail.insuranceId') },
        { id: 'plan', label: t('insuranceDetail.plan') },
        { id: 'level', label: t('insuranceDetail.level') },
        { id: 'expireDate', label: t('insuranceDetail.expire') },
        { label: '' }
    ];

    return (
        <div className={classes.tableRoot}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    t={t}
                    classes={classes}
                    numSelected={selected.length}
                    selectedText={t('insurancePage.table.selectedText')}
                    tableType={tableType}
                    title={t(`insurancePage.table.${tableType}`)}
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
                    enqueueSnackbar={enqueueSnackbar}
                    history={history}
                />
                <EnhancedPagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    size={insurances.length}
                    flipPage={(page) => dispatch(TableActions.flipPage(page))}
                />
            </Paper>
        </div>
    );
};

export default TabContentSection;