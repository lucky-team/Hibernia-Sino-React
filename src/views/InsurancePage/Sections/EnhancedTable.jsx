import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';

import InsuranceDetail from 'views/Detail/InsuranceDetail';

import { Table, TableBody, TableCell, TableSortLabel, TableHead, TableRow,
     Checkbox, IconButton, Tooltip } from '@material-ui/core';
import { Info as InfoIcon, OfflineBolt as OfflineBoltIcon } from '@material-ui/icons';
import * as BaseUrl from 'routes/BaseUrl';

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
                                <TableCell>{row.plan}</TableCell>
                                <TableCell>{row.level}</TableCell>
                                <TableCell>{moment(row.expireDate).format('LL').toString()}</TableCell>
                                <TableCell>
                                    <Tooltip title={t('insurancePage.table.check')}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDialogContent(row);
                                                setDialogOpen(true);
                                            }}
                                            aria-label={t('insurancePage.table.check')}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={t('insurancePage.table.claim')}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                history.push(BaseUrl.claimProcessUrl + `#${row._id}`)
                                            }}
                                            aria-label={t('insurancePage.table.claim')}
                                        >
                                            <OfflineBoltIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <InsuranceDetail
                t={t}
                insurance={dialogContent}
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
            />
        </div>
    );

};

export default withStyles(enhancedTableStyle)(EnhancedTable);