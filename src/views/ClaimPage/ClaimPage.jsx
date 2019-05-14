import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withTranslation  } from 'react-i18next';
import moment from 'moment';
import withStyles from "@material-ui/core/styles/withStyles";
import * as BaseUrl from 'routes/BaseUrl.jsx';

import Header from 'views/Header/Header.jsx';
import ParallaxSection from 'views/ClaimPage/Sections/ParallaxSection.jsx';
import TabContentSection from 'views/ClaimPage/Sections/TabContentSection.jsx';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import ManageClaimPageStyle from 'assets/jss/material-kit-pro-react/views/ManageClaimPageStyle.jsx';

const ClaimPage = ({ ...props }) => {
    const {
        t,
        claim,
        enqueueSnackbar,
        history,
        changeLocale,
        classes
    } = props;

    const [allClaims, setAllClaims] = useState([]);
    const [pendingClaims, setPendingClaims] = useState([]);
    const [processingClaims, setProcessingClaims] = useState([]);
    const [finishedClaims, setFinishedClaims] = useState([]);

    useEffect(() => {
        console.log('Mount: claim page');
        document.title = `${t('claimPage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
    }, []);

    useEffect(() => {
        let claims = claim.content;
        let newPendingClaims = [];
        let newProcessingClaims = [];
        let newFinishedClaims = [];
        if (claims !== null) {
            claims.forEach((item) => {
                switch(item.status) {
                    case 'pending':
                        newPendingClaims.push(item);
                        break;
                    case 'processing':
                        newProcessingClaims.push(item);
                        break;
                    default:
                        newFinishedClaims.push(item);
                        break;
                }
            });
            setAllClaims(claims);
            setPendingClaims(newPendingClaims);
            setProcessingClaims(newProcessingClaims);
            setFinishedClaims(newFinishedClaims);
        }
    }, [claim]);

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
                    <NavPills
                        color='rose'
                        tabs={[
                            {
                                tabButton: t('claimPage.all'),
                                tabContent: (
                                    <TabContentSection
                                        classes={classes}
                                        claims={allClaims}
                                        t={t}
                                        history={history}
                                        tableType={'all'}
                                        enqueueSnackbar={enqueueSnackbar}
                                    />
                                )
                            },
                            {
                                tabButton: t('claimPage.pending'),
                                tabContent: (
                                    <TabContentSection
                                        classes={classes}
                                        claims={pendingClaims}
                                        t={t}
                                        history={history}
                                        tableType={'pending'}
                                        enqueueSnackbar={enqueueSnackbar}
                                    />
                                )
                            },
                            {
                                tabButton: t('claimPage.processing'),
                                tabContent: (
                                    <TabContentSection
                                        classes={classes}
                                        claims={processingClaims}
                                        t={t}
                                        history={history}
                                        tableType={'processing'}
                                        enqueueSnackbar={enqueueSnackbar}
                                    />
                                )
                            },
                            {
                                tabButton: t('claimPage.finished'),
                                tabContent: (
                                    <TabContentSection
                                        classes={classes}
                                        claims={finishedClaims}
                                        t={t}
                                        history={history}
                                        tableType={'finished'}
                                        enqueueSnackbar={enqueueSnackbar}
                                    />
                                )
                            }
                        ]}
                    />
                </CardBody>
            </Card>
            </div>
        </div>
    );
};

export default withTranslation()(withStyles(ManageClaimPageStyle)(ClaimPage));