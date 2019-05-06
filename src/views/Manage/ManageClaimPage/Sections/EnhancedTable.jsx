import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';

import ClaimDetail from 'views/Detail/ClaimDetail.jsx';

import { Table, TableBody, TableCell, TableSortLabel, TableHead, TableRow,
     Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { Assignment as AssignmentIcon, Done as DoneIcon, Info as InfoIcon } from '@material-ui/icons';
import Button from "components/CustomButtons/Button.jsx";

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
                <TableCell padding='checkbox'>
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
}

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
        assignClaim
    } = props;

    const [headInterminate, setHeadInterminate] = useState(false);
    const [headChecked, setHeadChecked] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogClaim, setDialogClaim] = useState(null);

    useEffect(() => console.log('Mount: EnhancedTable'), []);

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
    }

    const isSelected = (id) => {
        return selected.indexOf(id) !== -1;
    }

    return (
        <div className={classes.tableWrapper}>
            <Table
                className={classes.table}
            >
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
                                <TableCell>{moment(row.date).format('LL').toString()}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <Tooltip title={t('manageClaimPage.table.check')}>
                                        <IconButton 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDialogClaim(row);
                                                setDialogOpen(true);
                                            }}
                                            aria-label={t('manageClaimPage.table.check')}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {row.status === 'pending' && (
                                        <Tooltip title={t('manageClaimPage.table.assign')}>
                                            <IconButton
                                                aria-label={t('manageClaimPage.table.assign')}
                                                onClick={(e) => {
                                                    assignClaim(row._id);
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <AssignmentIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        );

                    })}
                </TableBody>
        </Table>
        <ClaimDetail
            t={t}
            claim={dialogClaim}
            open={dialogOpen}
            handleClose={() => setDialogOpen(false)}
        />
        </div>
    );
};


export default withStyles(enhancedTableStyle)(EnhancedTable);