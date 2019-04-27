import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { InputAdornment, Icon } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import Header from 'views/Header/Header.jsx';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.jsx";

import image from "assets/img/bg7.jpg";
import * as BaseUrl from 'routes/BaseUrl.jsx';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.title = this.props.t('loginPage.pageTitle');
        console.log(this.props);
    }

    handleChange(event) {
        const { name, value} = event.target;
        this.setState({[name]: value});
    }

    handleLogin(event) {
        const { username, password } = this.state;
        this.props.login({username: username, password: password});
        event.preventDefault();
        this.props.history.push(BaseUrl.homeUrl);
    }

    render() {
        const { classes, t } = this.props;
        const { username, password } = this.state;

        const Socials = () => (
            <div className={classes.socialLine}>
                <Button
                    justIcon
                    color='transparent'
                    className={classes.iconButtons}
                >
                    <i className="fab fa-twitter" />
                </Button>
                <Button
                    justIcon
                    color='transparent'
                    className={classes.iconButtons}
                >
                    <i className="fab fa-facebook" />
                </Button>
                <Button
                    justIcon
                    color='transparent'
                    className={classes.iconButtons}
                >
                    <i className="fab fa-google-plus-g" />
                </Button>
            </div>
        );

        return (
            <div>
                <Header
                    absolute
                    color='transparent'
                />
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={12} md={4}>
                                <Card>
                                    <form className={classes.form} onSubmit={this.handleLogin}>
                                        <CardHeader
                                            color="primary"
                                            signup
                                            className={classes.cardHeader}
                                        >
                                            <h4 className={classes.cardTitle}>{t('loginPage.title')}</h4>
                                            <Socials />
                                        </CardHeader>
                                        <p
                                            className={`${classes.description} ${classes.textCenter}`}
                                        >
                                            {t('loginPage.tip')}
                                        </p>
                                        <CardBody signup>
                                        <CustomInput
                                            formControlProps={{
                                                fullWidth: true,
                                                className: classes.customFormControlClasses
                                            }}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face
                                                            className={classes.inputAdornmentIcon}
                                                        />
                                                    </InputAdornment>
                                                ),
                                                placeholder: t('loginPage.form.username'),
                                                onChange: this.handleChange,
                                                name: 'username',
                                                value: username
                                            }}
                                            id={'username'}
                                        />
                                        <CustomInput
                                            formControlProps={{
                                                fullWidth: true,
                                                className: classes.customFormControlClasses
                                            }}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_utline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                placeholder: t('loginPage.form.password'),
                                                onChange: this.handleChange,
                                                type: 'password',
                                                name: 'password',
                                                value: password
                                            }}
                                            id={'password'}
                                        />
                                        </CardBody>
                                        <div className={classes.buttons}>
                                            <NavLink
                                                className={classes.navlink}
                                                to={BaseUrl.signupUrl}
                                            >
                                                {t('loginPage.form.signup')}
                                            </NavLink>
                                            <Button
                                                type='submit'
                                                round
                                                color="secondary"
                                                size="lg"
                                            >
                                                {t('loginPage.form.login')}
                                            </Button>
                                            
                                        </div>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(withTranslation()(withStyles(loginPageStyle)(LoginPage)));
