import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import { List, ListItem, Tooltip, Checkbox } from '@material-ui/core';

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

const RenderTable = ({ classes, content }) => {
    console.log('Mount: render table');
    console.log(content);
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
                    <Button>Check</Button>
                    <Button>Claim</Button>
                </div>
            ];
        })

        console.log(dataList);
        const item = content[0];
        console.log(`locale: ${moment.locale()}`);
        return (
            <Table
                hover
                striped 
                tableHead={[
                    '',
                    '#',
                    'Insurance Id',
                    'Plan',
                    'Level',
                    'Insured',
                    'Duration',
                    'Start',
                    'Expire',
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

const NavPillSection = ({ classes, t, content, page, rowsPerPage }) => {
    console.log(`length: ${content.length}`);
    let allInsurances = content;
    let validInsurances = [];
    let invalidInsurances = [];
    let allInsurancesShow = null;
    let validInsurancesShow = null;
    let invalidInsurancesShow = null;
    if (content.length !== 0) {
        allInsurances.map(n => {
            if (moment(n.expireDate).diff(moment()) >= 0) {
                validInsurances.push(n);
            } else {
                invalidInsurances.push(n);
            }
        });
        const allInsurancesShow = allInsurances
            .slice(page[0] * rowsPerPage[0], page[0] * rowsPerPage[0] + rowsPerPage[0]);
        const validInsurancesShow = validInsurances
            .slice(page[1] * rowsPerPage[1], page[1] * rowsPerPage[1] + rowsPerPage[1]);
        const invalidInsurancesShow = invalidInsurances
            .slice(page[2] * rowsPerPage[2], page[2] * rowsPerPage[2] + rowsPerPage[2]);
        
        console.log('show: ');
        console.log(allInsurancesShow);
        console.log(validInsurancesShow);
        console.log(invalidInsurancesShow);

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
                                            classes={classes}
                                            content={allInsurancesShow}
                                        />)
                                        : null
                                    
                                },
                                {
                                    tabButton: t('insurancePage.valid'),
                                    tabContent: 
                                        validInsurancesShow
                                        ?
                                        (<RenderTable
                                            classes={classes}
                                            content={validInsurancesShow}
                                        />)
                                        : null
                                },
                                {
                                    tabButton: t('insurancePage.invalid'),
                                    tabContent: 
                                        invalidInsurancesShow
                                        ?
                                        (<RenderTable
                                            classes={classes}
                                            content={invalidInsurancesShow}
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
            })
        }
        console.log(insurance);
    }

    isSelected(id) {
        return this.state.selected.indexOf(id) !== -1;
    }

    render() {
        const { classes, t, fetchInsurances } = this.props;
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
                    />
                </div>
            </div>
        );
    }
}

export default withTranslation()(withStyles(insurancePageStyle)(InsurancePage));
