import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import { List, ListItem, Tooltip } from '@material-ui/core';

import Header from 'views/Header/Header.jsx';

import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import insurancePageStyle from "assets/jss/material-kit-pro-react/views/insurancePageStyle.jsx";

const ParallaxSection = ({ t, classes }) => (
    <Parallax
        image={require("assets/img/bg2.jpg")}
        filter="dark"
        small
    >
        <div className={classes.container}>
            <GridContainer>
                <GridItem
                    md={8}
                    sm={8}
                    className={classNames(
                        classes.mlAuto,
                        classes.mrAuto,
                        classes.textCenter
                    )}
                >
                    <h2 className={classes.title}>{t('insurancePage.title')}</h2>
                </GridItem>
            </GridContainer>
        </div>
    </Parallax>
);

const RenderTable = ({ classes, t }) => {

    // return (

    // );
}

const TableSection = ({ classes, t }) => {

    return (
        <div className={classes.container}>
            <Card plain>
                <CardBody plain>
                    <h3 className={classes.cardTitle}></h3>
                    {/* <NavPills
                        color='rose'
                        tabs={{
                            tabButton: t('insurancePage.all'),
                            tabContent: (

                            )
                        }}
                    /> */}
                </CardBody>
            </Card>
        </div>
    );
}

class InsurancePage extends Component {

    componentDidMount() {
        const { t } = this.props;
        document.title = `${t('insurancePage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
        console.log('Mount: insurance page');
    }

    render() {
        const { classes, t } = this.props;

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
                />
                <ParallaxSection
                    classes={classes}
                    t={t}
                />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <TableSection
                        classes={classes}
                        t={t}
                    />
                </div>
            </div>
        );
    }
}

export default withTranslation()(withStyles(insurancePageStyle)(InsurancePage));
