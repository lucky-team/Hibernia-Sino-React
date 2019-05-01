import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import { List, ListItem, Tooltip, Checkbox } from '@material-ui/core';
import { withRouter } from "react-router-dom";
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

const fileClaim = (insuranceId, history) => {
    history.push(BaseUrl.claimProcessUrl + `#${insuranceId}`);
}

const RenderTable = ({ classes, content, t, history }) => {
    if (content) {
        const dataList = content.map((item, key) => {
            return [
                <Checkbox
                />,
                key + 1,
                item._id,
                item.plan,
                item.level,
                `${item.insured.firstname} ${item.insured.lastname}`,
                item.duration,
                moment(item.startDate).format('LL').toString(),
                moment(item.expireDate).format('LL').toString(),
                <div>
                    {item.claim ?
                        <Button>{t('insurancePage.table.claiming')}</Button>
                        : (
                        <>
                            <Button>{t('insurancePage.table.check')}</Button>
                            <Button
                                onClick={() => {
                                    fileClaim(item._id, history);
                                }}
                            >{t('insurancePage.table.claim')}</Button>
                        </>
                        )
                    }
                </div>
            ];
        })

        return (
            <Table
                hover
                striped 
                tableHead={[
                    '',
                    '#',
                    t('insurancePage.table.insuranceId'),
                    t('insurancePage.table.plan'),
                    t('insurancePage.table.level'),
                    t('insurancePage.table.insured'),
                    t('insurancePage.table.duration'),
                    t('insurancePage.table.start'),
                    t('insurancePage.table.expire'),
                    ''
                ]}
                tableData={dataList}
                customHeadCellClasses={[
                    classes.padding0,
                    classes.textCenter
                ]}
                customHeadClassesForCells={[0, 1, 2 ]}
                customCellClasses={[
                ]}
                customClassesForCells={[0, 1, 2]}
            />
        );
    } else {
        return (
            <div>No content</div>
        );
    }

    
}

const NavPillSection = ({ classes, t, content, page, rowsPerPage, history }) => {
    console.log(`length: ${content.length}`);
    let allInsurances = content;
    let activeValidInsurances = [];
    let inactiveInsurances = [];
    if (content.length !== 0) {
        allInsurances.map(n => {
            if (moment(n.expireDate).diff(moment()) >= 0) {
                activeValidInsurances.push(n);
            } else {
                inactiveInsurances.push(n);
            }
        });
        const allInsurancesShow = allInsurances
            .slice(page[0] * rowsPerPage[0], page[0] * rowsPerPage[0] + rowsPerPage[0]);
        const activeInsurancesShow = activeValidInsurances
            .slice(page[1] * rowsPerPage[1], page[1] * rowsPerPage[1] + rowsPerPage[1]);
        const inactiveInsurancesShow = inactiveInsurances
            .slice(page[2] * rowsPerPage[2], page[2] * rowsPerPage[2] + rowsPerPage[2]);

        return (
            <div className={classes.container}>
                <Card plain>
                    <CardBody plain>
                        <h3 className={classes.cardTitle}></h3>
                        <NavPills
                            color='rose'
                            tabs={[
                                {
                                    tabButton: t('insurancePage.all'),
                                    tabContent: 
                                        allInsurancesShow
                                        ?
                                        (<RenderTable
                                            t={t}
                                            classes={classes}
                                            content={allInsurancesShow}
                                            history={history}
                                        />)
                                        : null
                                    
                                },
                                {
                                    tabButton: t('insurancePage.valid'),
                                    tabContent: 
                                        activeInsurancesShow
                                        ?
                                        (<RenderTable
                                            t={t}
                                            classes={classes}
                                            content={activeInsurancesShow}
                                            history={history}
                                        />)
                                        : null
                                },
                                {
                                    tabButton: t('insurancePage.invalid'),
                                    tabContent: 
                                        inactiveInsurancesShow
                                        ?
                                        (<RenderTable
                                            t={t}
                                            classes={classes}
                                            content={inactiveInsurancesShow}
                                            history={history}
                                        />)
                                        : null
                                }
                            ]}
                        />
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (<div>test</div>);
    }

    
}

class InsurancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            selected: [],
            page: [0, 0, 0],
            rowsPerPage: [5, 5, 5]
        }
    }

    componentDidMount() {
        console.log('Mount: insurance page');
        const { t, insurance } = this.props;
        document.title = `${t('insurancePage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
        if (insurance.content === null) {
            // TODO
        } else {
            this.setState({
                content: insurance.content
            });
        }
    }

    isSelected(id) {
        return this.state.selected.indexOf(id) !== -1;
    }

    render() {
        const { classes, t, history } = this.props;
        const { content, page, rowsPerPage } = this.state;

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
                        content={content}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        history={history}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(withTranslation()(withStyles(insurancePageStyle)(InsurancePage)));
