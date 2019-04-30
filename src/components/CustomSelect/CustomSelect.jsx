import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from "@material-ui/core/styles/withStyles";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Clear, Check } from '@material-ui/icons';
import customSelectStyle from "assets/jss/material-kit-pro-react/components/customSelectStyle.jsx";
function CustomSelect({ ...props }) {
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success,
        menuItems
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
            formControlProps.className,
            classes.selectFormControl
        );
    } else {
        formControlClasses = classes.selectFormControl;
    }

    return (
        <FormControl {...formControlProps} className={formControlClasses}>
            {labelText !== undefined ? (
                <InputLabel
                    className={classes.selectLabel + " " + classes.labelRoot + " " + labelClasses}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null}
            <Select
                MenuProps={{
                    className: classes.selectMenu
                }}
                classes={{
                    select: classes.select
                }}
                id={id}
                {...inputProps}
            >
                {menuItems.map(item => (
                    <MenuItem 
                        classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                        }}
                        value={item.value}
                        key={item.name}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
            {error ? (
                <Clear className={classes.feedback + " " + classes.labelRootError} />
            ) : success ? (
                <Check className={classes.feedback + " " + classes.labelRootSuccess} />
            ) : null}
        </FormControl>
    );
}

CustomSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool
  };
  
export default withStyles(customSelectStyle)(CustomSelect);
