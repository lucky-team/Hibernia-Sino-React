import React, { Component } from "react";
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";

import { FormControl, InputLabel } from '@material-ui/core';

import Header from 'views/Header/Header.jsx';
import ParallaxSection from 'views/PurchasePage/Sections/ParallaxSection.jsx';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import Button from "components/CustomButtons/Button.jsx";
import moment from 'moment';
import Datetime from "react-datetime";

import * as BaseUrl from 'routes/BaseUrl';

import claimProcessPageStyle from "assets/jss/material-kit-pro-react/views/claimProcessPageStyle.jsx";

class PurchasePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insurance: {
                plan: '',
                level: '',
                startDate: '',
                duration: '',
                expireDate: '',
                // insured
                lastname: '',
                firstname: '',
                socialId: '',
                gender: '',
                age: '',
                phone: '',
                email: '',
                bankName: '',
                bankAccount: '',
                bankUsername: ''
            }
        };
    };

    componentDidMount() {
        console.log('Mount: purchase page');
        const { t } = this.props;
        document.title = `${t('purchasePage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            insurance: {...this.state.insurance, [name]: value}
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let insurance = this.state.insurance;
        insurance = {
            plan: insurance.plan,
            level: insurance.level,
            startDate: insurance.startDate,
            expireDate: insurance.expireDate,
            duration: insurance.duration,
            insured: {
                lastname: insurance.lastname,
                firstname: insurance.firstname,
                socialId: insurance.socialId,
                gender: insurance.gender,
                age: insurance.age,
                phone: insurance.phone,
                email: insurance.email,
                bankName: insurance.bankName,
                bankAccount: insurance.bankAccount,
                bankUsername: insurance.bankUsername
            }
        };
        this.props.createInsurance(insurance);
        setTimeout(() => {
            this.props.history.push(BaseUrl.myInsurancesUrl);
        }, 3000);
    }

    render() {
        const { changeLocale, t, classes } = this.props;
        const { insurance } = this.state;

        return (
            <div>
                <Header
                    absolute
                    fixed
                    color='transparent'
                    changeColorOnScroll={{
                        height: 220,
                        color: 'primary'
                    }}
                    changeLocale={changeLocale}
                />
                <ParallaxSection
                    t={t}
                    classes={classes}
                />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <form onSubmit={this.handleSubmit}>
                            <GridContainer spacing={16}>
                                <GridItem xs={12}>
                                    <h5><strong>{t('insuranceDetail.basic')}</strong></h5>
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.plan')}
                                        id="plan"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'plan',
                                            value: insurance.plan,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.level')}
                                        id="level"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'level',
                                            value: insurance.level,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.duration')}
                                        id="duration"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: 'number',
                                            name: 'duration',
                                            value: insurance.duration,
                                            onChange: (e) => {
                                                this.handleChange(e);
                                                if (insurance.startDate !== '') {
                                                    this.handleChange({
                                                        target: {
                                                            name: 'expireDate',
                                                            value: moment(insurance.startDate).add(e.target.value !== '' ? 
                                                                e.target.value : 0, 'd')
                                                        }
                                                    });
                                                }
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem md={4} sm={6}>
                                    <InputLabel className={classes.label}>
                                        {t('purchasePage.table.startDate')}
                                    </InputLabel>
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            onChange={(date) => {
                                                this.handleChange({
                                                    target: {
                                                        name: 'startDate',
                                                        value: date
                                                    }
                                                });
                                                this.handleChange({
                                                    target: {
                                                        name: 'expireDate',
                                                        value: moment(date).add(insurance.duration !== '' ? 
                                                            insurance.duration : 0, 'd')
                                                    }
                                                });
                                            }}
                                            value={insurance.startDate}
                                            formControlProps={{
                                                required: true
                                            }}
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem md={4} sm={6}>
                                    <InputLabel className={classes.label}>
                                        {t('purchasePage.table.expireDate')}
                                    </InputLabel>
                                    <br />
                                    <FormControl fullWidth>
                                        <Datetime
                                            onChange={(date) => this.handleChange({
                                                target: {
                                                    name: 'expireDate',
                                                    value: insurance.expireDate
                                                }
                                            })}
                                            value={insurance.expireDate}
                                            formControlProps={{
                                                required: true
                                            }}
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem xs={12}>
                                    <h5><strong>{t('bankDetail.title')}</strong></h5>
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.bankName')}
                                        id="bankName"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'bankName',
                                            value: insurance.bankName,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.bankAccount')}
                                        id="bankAccount"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'bankAccount',
                                            value: insurance.bankAccount,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.bankUsername')}
                                        id="bankUsername"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'bankUsername',
                                            value: insurance.bankUsername,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12}>
                                    <h5><strong>{t('insuredDetail.title')}</strong></h5>
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.firstname')}
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'firstname',
                                            value: insurance.firstname,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.lastname')}
                                        id="lastname"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'lastname',
                                            value: insurance.lastname,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.socialId')}
                                        id="socialId"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'socialId',
                                            value: insurance.socialId,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.gender')}
                                        id="gender"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'gender',
                                            value: insurance.gender,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.age')}
                                        id="age"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'age',
                                            value: insurance.age,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.phone')}
                                        id="phone"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'phone',
                                            value: insurance.phone,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('purchasePage.table.email')}
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'email',
                                            value: insurance.email,
                                            onChange: this.handleChange
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12}>
                                    <GridContainer spacing={16}>
                                        <GridItem xs={12} md={2}>
                                            <Button
                                                color='rose'
                                                type='submit'
                                                round
                                            >
                                                {t('purchasePage.table.confirm')}
                                            </Button>
                                        </GridItem>
                                        <GridItem xs={12} md={2}>
                                            <Button
                                                round
                                            >
                                                {t('purchasePage.table.cancel')}
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default withTranslation()(withStyles(claimProcessPageStyle)(PurchasePage));
