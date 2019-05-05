import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";

import { TableSortLabel, Tooltip } from '@material-ui/core';

import Header from 'views/Header/Header.jsx';

import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Pagination from 'components/Pagination/Pagination.jsx';

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
        history,
        changeSort,
        order,
        orderBy
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
                    <TableSortLabel
                        active={orderBy === '_id'}
                        direction={order}
                        onClick={() => changeSort('_id')}
                        >{t('claimPage.table.claimId')}</TableSortLabel>
                    ,
                    <TableSortLabel
                        active={orderBy === 'location'}
                        direction={order}
                        onClick={() => changeSort('location')}
                        >{t('claimPage.table.location')}</TableSortLabel>
                    ,
                    <TableSortLabel
                        active={orderBy === 'amount'}
                        direction={order}
                        onClick={() => changeSort('amount')}
                        >{t('claimPage.table.amount')}</TableSortLabel>
                    ,
                    <TableSortLabel
                        active={orderBy === 'date'}
                        direction={order}
                        onClick={() => changeSort('date')}
                        >{t('claimPage.table.date')}</TableSortLabel>
                    ,
                    <TableSortLabel
                        active={orderBy === 'status'}
                        direction={order}
                        onClick={() => changeSort('status')}
                        >{t('claimPage.table.status')}</TableSortLabel>
                    
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

const RenderPanigations = ({ ...props }) => {
    const {
        page,
        rowsPerPage,
        size,
        classes,
        changePage
    } = props;
    const pageSize = Math.ceil(size / rowsPerPage);
    let pages = [];
    pages.push({
        text: '«',
        onClick: () => changePage(0)
    });
    const pageTemplate = (i) => ({
        active: page === (i - 1),
        onClick: () => changePage(i-1),
        text: i
    });
    if (pageSize <= 5) {
        for (let i = 1; i <= pageSize; i++) {
            pages.push(pageTemplate(i));
        }
    } else {
        if (page + 1 < 3) {
            for (let i = 1; i <= 5; i++) {
                pages.push(pageTemplate(i));
            }
        } else if (page > pageSize - 3) {
            for (let i = pageSize - 4; i <= pageSize; i++) {
                pages.push(pageTemplate(i));
            }
        } else {
            for (let i = page - 1; i <= page + 3; i++) {
                pages.push(pageTemplate(i));
            }
        }
    }
    pages.push({
        text: '»',
        onClick: () => changePage(pageSize-1)
    });
    return (
        <div>
            <Pagination
                className={`${classes.textCenter} ${
                classes.justifyContentCenter
                } ${classes.pagination}`}
                pages={pages}
                color="primary"
            />
        </div> 
    );
}

const NavPillSection = ({ ...props }) => {
    const {
        classes,
        t,
        insurances,
        claims,
        page,
        rowsPerPage,
        history,
        changeSort,
        changePage,
        order,
        orderBy
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
            return null;
        });
        allClaims = stableSort(allClaims, getSorting(order[0], orderBy[0]));
        activeClaims = stableSort(activeClaims, getSorting(order[1], orderBy[1]));
        inactiveClaims = stableSort(inactiveClaims, getSorting(order[2], orderBy[2]));
        const allClaimsShow = allClaims
            .slice(page[0] * rowsPerPage[0], page[0] * rowsPerPage[0] + rowsPerPage[0]);
        const activeClaimsShow = activeClaims
            .slice(page[1] * rowsPerPage[1], page[1] * rowsPerPage[1] + rowsPerPage[1]);
        const inactiveClaimsShow = inactiveClaims
            .slice(page[2] * rowsPerPage[2], page[2] * rowsPerPage[2] + rowsPerPage[2]);
        
        console.log('all claims');
        console.log(claims);
        console.log(allClaimsShow);
        return (
            <div className={classes.container}>
                <Card plain>
                    <CardBody plain>
                        <NavPills
                            color='rose'
                            tabs={[
                                {
                                    tabButton: t('claimPage.all'),
                                    tabContent: (
                                    <>
                                        <RenderTable
                                            t={t}
                                            classes={classes}
                                            content={allClaimsShow}
                                            history={history}
                                            changeSort={changeSort(0)}
                                            order={order[0]}
                                            orderBy={orderBy[0]}
                                        />
                                        <RenderPanigations 
                                            changePage={changePage(0)}
                                            page={page[0]}
                                            rowsPerPage={rowsPerPage[0]}
                                            classes={classes}
                                            size={allClaims.length}
                                        />
                                    </>
                                    )
                                        
                                },
                                {
                                    tabButton: t('claimPage.active'),
                                    tabContent: 
                                    <>
                                        <RenderTable
                                            t={t}
                                            classes={classes}
                                            content={activeClaimsShow}
                                            history={history}
                                            changeSort={changeSort(1)}
                                            order={order[1]}
                                            orderBy={orderBy[1]}
                                        /> 
                                        <RenderPanigations 
                                            changePage={changePage(1)}
                                            page={page[1]}
                                            rowsPerPage={rowsPerPage[1]}
                                            classes={classes}
                                            size={activeClaims.length}
                                        />
                                    </>
                                },
                                {
                                    tabButton: t('claimPage.inactive'),
                                    tabContent: 
                                    <>
                                        <RenderTable
                                            t={t}
                                            classes={classes}
                                            content={inactiveClaimsShow}
                                            history={history}
                                            changeSort={changeSort(2)}
                                            order={order[2]}
                                            orderBy={orderBy[2]}
                                        />
                                        <RenderPanigations 
                                            changePage={changePage(2)}
                                            page={page[2]}
                                            rowsPerPage={rowsPerPage[2]}
                                            classes={classes}
                                            size={inactiveClaims.length}
                                        />
                                    </> 
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

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    } else if (b[orderBy] > a[orderBy]) {
        return 1;
    } else {
        return 0;
    }
}

const stableSort = (array, cmp) => {
    if (array !== null && array.length !== 0) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }
    return array;
}

const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class ClaimPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            insurances: [],
            claims: [],
            selected: [],
            page: [0, 0, 0],
            rowsPerPage: [10, 10, 10],
            order: ['asc', 'asc', 'asc'],
            orderBy: ['amount', 'amount', 'amount']
        }
    }

    componentDidMount() {
        console.log('Mount: claim page');
        const { t, insurance, claim, auth, enqueueSnackbar, history } = this.props;
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

    changePage = (index) => (page) => {
        this.setState(prev => {
            let newPages = prev.page;
            newPages[index] = page;
            return {
                page: newPages
            }
        })
    }

    changeSort = (index) => (orderBy) => {
        this.setState(prev => {
            let newOrderBy = prev.orderBy;
            let newOrder = prev.order;
            if (newOrderBy[index] === orderBy) {
                newOrder[index] = newOrder[index] === 'desc' ? 'asc' : 'desc';
            } else {
                newOrderBy[index] = orderBy;
                newOrder[index] = 'desc';
            }
            return ({
                order: newOrder,
                orderBy: newOrderBy
            })
        })
    }

    render() {
        const { classes, t,  history, changeLocale } = this.props;
        const { insurances, claims, page, rowsPerPage, order, orderBy } = this.state;
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
                        changeSort={this.changeSort}
                        changePage={this.changePage}
                        order={order}
                        orderBy={orderBy}
                    />
                </div>
                
            </div>
        );
    }
}

export default withTranslation()(withStyles(claimPageStyle)(ClaimPage));