import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import insuranceDetailStyle from 'assets/jss/material-kit-pro-react/views/insuranceDetailStyle.jsx';

const InsuranceDetail = ({ ...props }) => {
    const {
        insurance,
        classes
    } = props;

    return (
        <Paper>
            <GridContainer className={classes.main}>
                Test
            </GridContainer>
        </Paper>
    );
};

export default withStyles(insuranceDetailStyle)(InsuranceDetail);