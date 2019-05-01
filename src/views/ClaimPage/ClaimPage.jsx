import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import * as BaseUrl from 'routes/BaseUrl.jsx';

import Header from 'views/Header/Header.jsx';

import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";

import claimPageStyle from "assets/jss/material-kit-pro-react/views/claimPageStyle.jsx";

const ParallaxSection = ({ t, classes }) => (
    <Parallax
        image={require("assets/img/card-blog1.jpg")}
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
                    <h2 className={classes.title}>{t('claimPage.title')}</h2>
                </GridItem>
            </GridContainer>
        </div>
    </Parallax>
);

const RenderTable = ({ ...props }) => {
    const {
        classes,
        content,
        t,
        history
    } = props;
    if (content) {
        const dataList = content.map((item, key) => {
            return [
                key + 1,
                item._id,
                item.location,
                item.amount,
                moment(item.createdAt).format('LL').toString(),
                t(`claimPage.table.${item.status}`)
            ]
        })

        return (
            <Table
                hover
                striped
                tableHead={[
                    '#',
                    t('claimPage.table.claimId'),
                    t('claimPage.table.location'),
                    t('claimPage.table.amount'),
                    t('claimPage.table.date'),
                    t('claimPage.table.status')
                ]}
                tableData={dataList}
                customHeadCellClasses={[
                    classes.padding0,
                ]}
                customHeadClassesForCells={[0]}
            />
        )
    } else {
        return (
            <div>No content</div>
        );
    }
}

const NavPillSection = ({ ...props }) => {
    const {
        classes,
        t,
        insurances,
        claims,
        page,
        rowsPerPage,
        history
    } = props;
    let allClaims = [];
    let activeClaims = [];
    let inactiveClaims = [];
    if (claims !== null && claims.length !== 0) {
        claims.map(n => {
            if (n.status === 'pending' ||
            n.status === 'processing') {
                activeClaims.push(n);
            } else {
                inactiveClaims.push(n);
            }
            allClaims.push(n);
        });
        const allClaimsShow = allClaims
            .slice(page[0] * rowsPerPage[0], page[0] * rowsPerPage[0] + rowsPerPage[0]);
        const activeClaimsShow = activeClaims
            .slice(page[0] * rowsPerPage[0], page[0] * rowsPerPage[0] + rowsPerPage[0]);
        const inactiveClaimsShow = inactiveClaims
            .slice(page[0] * rowsPerPage[0], page[0] * rowsPerPage[0] + rowsPerPage[0]);
        
        console.log('all claims');
        console.log(claims);
        console.log(allClaimsShow);
        return (
            <div className={classes.container}>
                <Card plain>
                    <CardBody plain>
                        <h3 className={classes.cardTitle}></h3>
                        <NavPills
                            color='rose'
                            tabs={[
                                {
                                    tabButton: t('claimPage.all'),
                                    tabContent: 
                                        <RenderTable
                                            t={t}
                                            classes={classes}
                                            content={allClaimsShow}
                                            history={history}
                                        /> 
                                        
                                },
                                {
                                    tabButton: t('claimPage.active'),
                                    tabContent: 
                                        <RenderTable
                                            t={t}
                                            classes={classes}
                                            content={activeClaimsShow}
                                            history={history}
                                        /> 
                                },
                                {
                                    tabButton: t('claimPage.inactive'),
                                    tabContent: 
                                        <RenderTable
                                            t={t}
                                            classes={classes}
                                            content={inactiveClaimsShow}
                                            history={history}
                                        /> 
                                }
                            ]}
                        />
                    </CardBody>
                </Card>
            </div>
        )
    } else {
        return (<div>test</div>);
    }
}

class ClaimPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insurances: [],
            claims: [],
            selected: [],
            page: [0, 0, 0],
            rowsPerPage: [5, 5, 5]
        }
    }

    componentDidMount() {
        console.log('Mount: claim page');
        const { t, insurance, claim } = this.props;
        document.title = `${t('claimPage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
        if (insurance.content === null) {
            // TODO
        } else {
            this.setState({
                insurances: insurance.content
            });
        }
        if (claim === null) {
            // TODO
        } else {
            this.setState({
                claims: claim.content
            });
        }
    }

    render() {
        const { classes, t,  history } = this.props;
        const { insurances, claims, page, rowsPerPage } = this.state;
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
                    <NavPillSection
                        classes={classes}
                        t={t}
                        insurances={insurances}
                        claims={claims}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        history={history}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(withTranslation()(withStyles(claimPageStyle)(ClaimPage)));