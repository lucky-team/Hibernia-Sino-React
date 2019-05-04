import React from 'react';
import classNames from 'classnames';
import { withTranslation  } from 'react-i18next';
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import * as BaseUrl from 'routes/BaseUrl.jsx';

import { Button } from '@material-ui/core';

import Header from 'views/Header/Header.jsx';

import ManageClaimPageStyle from 'assets/jss/material-kit-pro-react/views/ManageClaimPageStyle.jsx';

const ManageClaimPage = ({ ...props }) => {
    console.log(props);
    const { t } = props;
    return (
        <Button onClick={() => props.history.push('/login')}>{t('header.home')}</Button>
    )

}

export default withRouter(withTranslation()(ManageClaimPage));