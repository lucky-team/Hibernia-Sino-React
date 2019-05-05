import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withTranslation  } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";
import * as BaseUrl from 'routes/BaseUrl.jsx';

import Header from 'views/Header/Header.jsx';
import ParallaxSection from 'views/Manage/ManageClaimPage/Sections/ParallaxSection.jsx';
import NavpillsSection from 'views/Manage/ManageClaimPage/Sections/NavpillsSection.jsx';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import ManageClaimPageStyle from 'assets/jss/material-kit-pro-react/views/ManageClaimPageStyle.jsx';

const ManageClaimPage = ({ ...props }) => {
    const {
        t,
        auth,
        insurance,
        claim,
        enqueueSnackbar,
        history,
        changeLocale,
        classes,
        fetchInsurances,
    } = props;

    useEffect(() => {
        console.log('Mount: manage claim page');
        document.title = `${t('manageClaimPage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
        if (!auth.employee) {
            enqueueSnackbar({
                message: 'Not an Hibinia-Sino employee',
                options: {
                    variant: 'warning',
                },
                field: 'actions.auth'
            });
            history.push(BaseUrl.loginUrl);
        }
    }, [auth]);

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
            <div className={classNames(classes.main, classes.mainRaised, classes.container)}>
                <Card plain>
                    <CardBody plain>
                        <NavpillsSection
                            t={t}
                            classes={classes}
                            insurances={insurance.content}
                            claims={claim.content}
                            history={history}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default withTranslation()(withStyles(ManageClaimPageStyle)(ManageClaimPage));
