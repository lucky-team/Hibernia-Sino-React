import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Popover } from '@material-ui/core';

import popoverStyles from "assets/jss/material-kit-pro-react/popoverStyles.jsx";

function CustomPopover({ ...props }) {
    const {
        classes,
        className,
        header,
        body,
        open,
        anchorEl,
        anchorReference,
        onClose,
        anchorOrigin,
        transformOrigin
    } = props;

    return (
        <Popover
            classes={{
                paper: classes.popover
            }}
            className={className}
            open={open}
            anchorEl={anchorEl}
            anchorReference={anchorReference}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            <h3 className={classes.popoverHeader}>{header}</h3>
            <div className={classes.popoverBody}>
                {body}
            </div>
        </Popover>
    );
}

export default withStyles(popoverStyles)(CustomPopover);