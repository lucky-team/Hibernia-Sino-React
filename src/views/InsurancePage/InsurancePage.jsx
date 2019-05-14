import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { withTranslation  } from 'react-i18next';
import moment from 'moment';
import withStyles from "@material-ui/core/styles/withStyles";
import * as BaseUrl from 'routes/BaseUrl.jsx';

import Header from 'views/Header/Header.jsx';
import ParallaxSection from 'views/InsurancePage/Sections/ParallaxSection.jsx';
import TabContentSection from 'views/InsurancePage/Sections/TabContentSection.jsx';

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import ManageClaimPageStyle from 'assets/jss/material-kit-pro-react/views/ManageClaimPageStyle.jsx';

const InsurancePage = ({ ...props }) => {
    const {
        t,
        insurance,
        enqueueSnackbar,
        history,
        changeLocale,
        classes
    } = props;

    const [allInsurances, setAllInsurances] = useState([]);
    const [activeInsurances, setActiveInsurances] = useState([]);
    const [finishedInsurances, setFinished] = useState([]);

    useEffect(() => {
        console.log('Mount: insurance page');
        document.title = `${t('insurancePage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
    }, []);

    useEffect(() => {
        let insurances = insurance.content;
        let newActiveInsurances = [];
        let newFinishedInsurances = [];
        const now = moment();
        if (insurances !== null) {
            insurances.forEach((item) => {
                let expire = moment(item.expireDate);
                if (expire - now >= 0) {
                    newActiveInsurances.push(item);
                } else {
                    newFinishedInsurances.push(item);
                }
            });
            setAllInsurances(insurances);
            setActiveInsurances(newActiveInsurances);
            setFinished(newFinishedInsurances);
        }
    }, [insurance]);

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
                                    tabButton: t('insurancePage.all'),
                                    tabContent: (
                                        <TabContentSection
                                            classes={classes}
                                            insurances={allInsurances}
                                            t={t}
                                            history={history}
                                            tableType={'all'}
                                            enqueueSnackbar={enqueueSnackbar}
                                        />
                                    )
                                },
                                {
                                    tabButton: t('insurancePage.active'),
                                    tabContent: (
                                        <TabContentSection
                                            classes={classes}
                                            insurances={activeInsurances}
                                            t={t}
                                            history={history}
                                            tableType={'active'}
                                            enqueueSnackbar={enqueueSnackbar}
                                        />
                                    )
                                },
                                {
                                    tabButton: t('insurancePage.inactive'),
                                    tabContent: (
                                        <TabContentSection
                                            classes={classes}
                                            insurances={finishedInsurances}
                                            t={t}
                                            history={history}
                                            tableType={'inactive'}
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
}

export default withTranslation()(withStyles(ManageClaimPageStyle)(InsurancePage));
