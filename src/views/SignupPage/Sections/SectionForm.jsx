import React, { Component } from 'react';
import {
    InputAdornment, Checkbox, FormControlLabel, Icon, Divider
} from '@material-ui/core';
import { Face, Check } from '@material-ui/icons';
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";


class SectionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0]
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }

    render() {
        const { classes, t, handleChange, handleRegister, username, password } = this.props;

        return (
            <GridItem xs={12} sm={5} md={5}>
                <div className={classes.textCenter}>
                    <h4 className={classes.description}>
                        {t('signupPage.socialTitle')}
                    </h4>
                    <Button justIcon round color="twitter">
                        <i
                        className={classes.socials + " fab fa-twitter"}
                        />
                    </Button>
                    {` `}
                    <Button justIcon round color="dribbble">
                        <i
                        className={classes.socials + " fab fa-dribbble"}
                        />
                    </Button>
                    {` `}
                    <Button justIcon round color="facebook">
                        <i
                        className={classes.socials + " fab fa-facebook-f"}
                        />
                    </Button>
                    {` `}
                    <Divider variant='middle' className={classes.divider} />
                    <h4 className={classes.description}>
                        {t('signupPage.socialTail')}
                    </h4>
                </div>
                <form className={classes.form} onSubmit={handleRegister}>
                    <CustomInput
                        formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                        }}
                        inputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                >
                                    <Face
                                        className={classes.inputAdornmentIcon}
                                    />
                                </InputAdornment>
                            ),
                            placeholder: t('signupPage.form.username'),
                            onChange: handleChange,
                            name: 'username',
                            value: username
                        }}
                        id={'username'}
                    />
                    <CustomInput
                        formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                        }}
                        inputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                >
                                    <Icon className={classes.inputAdornmentIcon}>
                                        lock_outline
                                    </Icon>
                                </InputAdornment>
                            ),
                            placeholder: t('signupPage.form.password'),
                            type: 'password',
                            onChange: handleChange,
                            name: 'password',
                            value: password
                        }}
                        id={'password'}
                    />
                    <CustomInput
                        formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                        }}
                        inputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    className={classes.inputAdornment}
                                >
                                    <Icon className={classes.inputAdornmentIcon}>
                                        lock_outline
                                    </Icon>
                                </InputAdornment>
                            ),
                            placeholder: t('signupPage.form.confirm'),
                            type: 'password'
                        }}
                    />
                    <FormControlLabel
                        classes={{
                            label: classes.label
                        }}
                        control={
                            <Checkbox
                                tabIndex={-1}
                                onClick={() => this.handleToggle(1)}
                                checkedIcon={
                                    <Check className={classes.checkedIcon} />
                                }
                                icon={
                                    <Check className={classes.uncheckedIcon} />
                                }
                                classes={{
                                    checked: classes.checked,
                                    root: classes.checkRoot
                                }}
                                checked={
                                    this.state.checked.indexOf(1) !== -1
                                        ? true
                                        : false
                                }
                            />
                        }
                        label={
                            <span>
                                {t('signupPage.form.hint')}{" "}
                                <a href="#declaration">{t('signupPage.form.declaration')}</a>.
                            </span>
                        }
                    />
                    <div className={classes.textCenter}>
                        <Button type='submit' round color="primary">
                            {t('signupPage.form.register')}
                        </Button>
                    </div>
                </form>
            </GridItem>
        );
    }
}

export default SectionForm;