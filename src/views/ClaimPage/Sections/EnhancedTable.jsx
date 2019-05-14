import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';

import ClaimDetail from 'views/Detail/ClaimDetail';

import { Table, TableBody, TableCell, TableSortLabel, TableHead, TableRow,
     Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { Info as InfoIcon, OfflineBolt as OfflineBoltIcon } from '@material-ui/icons';
import { baseUrl } from 'routes/BaseUrl';

import enhancedTableStyle from "assets/jss/material-kit-pro-react/components/enhancedTableStyle.jsx";

const EnhancedTableHead = ({ ...props }) => {
    const {
        classes,
        indeterminate,
        checked,
        headRows,
        order,
        orderBy,
        rowsPerPage,
        changeOrder,
        selectPageItems
    } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell
                className={clsx(classes.tableCell, classes.tabelHeadCell)}
                
                padding='checkbox'>
                    <Checkbox
                        indeterminate={indeterminate}
                        checked={checked}
                        onChange={selectPageItems}
                    />
                </TableCell>
                {headRows.map((row) => (
                    <TableCell
                        className={clsx(classes.tableCell, classes.tabelHeadCell)}
                        key={row.id}
                        sortDirection={orderBy === row.id? order : false }
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={() => changeOrder(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const fetchInsurance = (insuranceId, setInsurance) => {
    const bearer = 'Bearer ' +  localStorage.getItem('token');
    const url = baseUrl + `insurances?_id=${insuranceId}`;

    fetch(url, {
        headers: {
            'Authorization': bearer
        },
        method: 'GET'
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        setInsurance(response[0]);
    });
};

const EnhancedTable = ({ ...props }) => {
    const {
        t,
        classes,
        headRows,
        content,
        selected,
        order,
        orderBy,
        rowsPerPage,
        changeOrder,
        addSelected,
        removeSelected,
        enqueueSnackbar,
        history
    } = props;

    const [headInterminate, setHeadInterminate] = useState(false);
    const [headChecked, setHeadChecked] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);
    const [insurance, setInsurance] = useState(null);

    useEffect(() => console.log('Mount: enhanced table'), []);

    useEffect(() => {
        const currentSelected = content.filter((el) => selected.includes(el._id));
        if (currentSelected.length > 0) {
            if (currentSelected.length < rowsPerPage) {
                setHeadInterminate(true);
            } else if (currentSelected.length === rowsPerPage) {
                setHeadChecked(true);
            }
        } else if (currentSelected.length === 0) {
            setHeadInterminate(false);
            setHeadChecked(false);
        }
    }, [content, selected]);

    const selectPageItems = (event) => {
        if (event.target.checked) {
            const newSelected = content.filter((el) => !selected.includes(el._id))
                .map((el) => el._id);
            addSelected(newSelected);
        } else {
            removeSelected(content.map((el) => el._id));
        }
    };

    const selectItem = (id) => {
        const selectedIndex = selected.indexOf(id);
        if (selectedIndex === -1) {
            addSelected([id]);
        } else {
            removeSelected([id]);
        }
    };

    const isSelected = (id) => {
        return selected.indexOf(id) !== -1;
    };

    return (
        <div className={classes.tableWrapper}>
            <Table className={classes.table}>
                <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    numSelected={selected.length}
                    rowsPerPage={rowsPerPage}
                    headRows={headRows}
                    indeterminate={headInterminate}
                    checked={headChecked}
                    changeOrder={changeOrder}
                    selectPageItems={selectPageItems}
                />
                <TableBody>
                    {content.map((row) => {
                        const isItemSelected = isSelected(row._id);
                        return (
                            <TableRow
                                hover
                                onClick={() => selectItem(row._id)}
                                role='checkbox'
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row._id}
                                selected={isItemSelected}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isItemSelected} />
                                </TableCell>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{moment(row.createdAt).format('LL').toString()}</TableCell>
                                <TableCell>
                                    <Tooltip title={t('claimPage.table.check')}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                fetchInsurance(row.insurance, (resp) => setInsurance(resp));
                                                setDialogContent(row);
                                                setDialogOpen(true);
                                            }}
                                            aria-label={t('claimPage.table.check')}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <ClaimDetail
                t={t}
                claim={dialogContent}
                insurance={insurance}
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
            />
        </div>
    );

};

export default withStyles(enhancedTableStyle)(EnhancedTable);
