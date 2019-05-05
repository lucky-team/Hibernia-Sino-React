import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Timeline, Code, Group } from
    '@material-ui/icons';

import { withTranslation } from 'react-i18next';

import Header from 'views/Header/Header.jsx';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import SectionInfo from 'views/SignupPage/Sections/SectionInfo.jsx';
import SectionForm from 'views/SignupPage/Sections/SectionForm.jsx';

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";

import image from "assets/img/bg7.jpg";

const Infos = (t) => {
    return [
        {
            'title': t('signupPage.infos.infoA.title'),
            'description': t('signupPage.infos.infoA.description'),
            'icon': Timeline,
            'iconColor': 'rose'
        },
        {
            'title': t('signupPage.infos.infoB.title'),
            'description': t('signupPage.infos.infoB.description'),
            'icon': Code,
            'iconColor': 'primary'
        },
        {
            'title': t('signupPage.infos.infoC.title'),
            'description': t('signupPage.infos.infoC.description'),
            'icon': Group,
            'iconColor': 'info'
        }
    ];
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            username: '',
            password: '',
            confirm: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.title = this.props.t('signupPage.pageTitle');
    }
    
    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleRegister(event) {
        const { username, password, confirm, checked } = this.state;
        if (password !== confirm) {
            this.props.enqueueSnackbar({
                message: 'Password is not same with confirm password',
                options: {
                    variant: 'error',
                },
                field: 'actions.auth'
            });
        } else if (username === '') {
            this.props.enqueueSnackbar({
                message: 'Please enter username',
                options: {
                    variant: 'error',
                },
                field: 'actions.auth'
            });
        } else if (password === '') {
            this.props.enqueueSnackbar({
                message: 'Please enter password',
                options: {
                    variant: 'error',
                },
                field: 'actions.auth'
            });
        } else if (!checked) {
            this.props.enqueueSnackbar({
                message: 'Please check the agreement',
                options: {
                    variant: 'error',
                },
                field: 'actions.auth'
            });
        } else {
            this.props.register({username: username, password: password}, this.props.history);
        }
        event.preventDefault();
    }

    render() {
        const { classes, t, changeLocale, ...rest } = this.props;
        const { username, password, confirm } = this.state;
        const infos = Infos(t);

        return (
            <div>
                <Header
                    absolute
                    color='transparent'
                    changeLocale={changeLocale}
                    {...rest}
                />
                <div
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: 'url(' + image + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'top center'
                    }}
                >
                    <div className={classes.container}>
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={10} md={10}>
                                <Card className={classes.cardSignup}>
                                    <h2 className={classes.cardTitle}>{t('signupPage.title')}</h2>
                                    <CardBody>
                                        <GridContainer justify='center'>
                                            <SectionInfo infos={infos} classes={classes} />
                                            <SectionForm classes={classes} t={t} handleChange={this.handleChange}
                                                username={username} password={password} confirm={confirm} handleRegister={this.handleRegister} />
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withStyles(signupPageStyle)(Signup));