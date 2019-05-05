import React, { Component } from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";
import * as BaseUrl from 'routes/BaseUrl.jsx';

import { Stepper, Step, StepLabel } from '@material-ui/core';

import Header from 'views/Header/Header.jsx';
import ChooseTypeSection from 'views/ClaimProcessPage/Sections/ChooseTypeSection.jsx';
import FillingDetailsSection from 'views/ClaimProcessPage/Sections/FillingDetailsSection.jsx';

import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import claimProcessPageStyle from "assets/jss/material-kit-pro-react/views/claimProcessPageStyle.jsx";

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
                    <h2 className={classes.title}>{t('claimProcessPage.title')}</h2>
                </GridItem>
            </GridContainer>
        </div>
    </Parallax>
);

const StepContent = ({ ...props }) => {
    const {
        activeStep,
        classes,
        handleChange,
        handleUpdateFiles,
        handleSubmit,
        handleNext,
        history,
        t,
        claim
    } = props;

    switch(activeStep) {
        case 0:
            return (
                <ChooseTypeSection
                    classes={classes}
                    t={t}
                    handleChange={handleChange}
                    handleNext={handleNext}
                />
            );
        case 1:
            return (
                <FillingDetailsSection
                    classes={classes}
                    t={t}
                    handleChange={handleChange}
                    handleUpdateFiles={handleUpdateFiles}
                    handleSubmit={handleSubmit}
                    handleNext={handleNext}
                    claim={claim}
                />
            );
        case 2:
            setTimeout(() => {
                history.push(BaseUrl.myInsurancesUrl)
            }, 5000);
            return (
                <div>Success</div>
            );
    }
}

const ClaimBody = ({ ...props }) => {
    const {
        t,
        classes,
        steps,
        activeStep,
        handleNext,
        handleBack,
        handleReset,
        handleChange,
        handleUpdateFiles,
        handleSubmit,
        history,
        claim
    } = props;

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    return (
                        <Step key={label} >
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <StepContent
                activeStep={activeStep}
                classes={classes}
                handleChange={handleChange}
                handleUpdateFiles={handleUpdateFiles}
                handleSubmit={handleSubmit}
                handleNext={handleNext}
                t={t}
                claim={claim}
                history={history}
            />
        </div>
    );
}

class ClaimProcessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            claim: {
                files: [],
                location: '',
                amount: '',
                reason: '',
                type: '',
                date: '',
                insurance: ''
            }
        }
    };

    componentDidMount() {
        console.log('Mount: claim process page');
        const { t } = this.props;
        document.title = `${t('claimProcessPage.pageTitle')}${t('general.titleConnector')}${t('general.titleSign')}`;
        const pathname = window.location.href;
        let insuranceIdIndex = pathname.indexOf('#');
        if (insuranceIdIndex === -1) {
            this.props.history.push(BaseUrl.myInsurancesUrl);
        }
        let insuranceId = pathname.slice(insuranceIdIndex + 1);
        this.setState({
            claim: {...this.state.claim, insurance: insuranceId}
        })
    };

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({
            claim: { ...this.state.claim, [name]: value }
        });
    };

    handleUpdateFiles = (fileItems) => {
        const files = fileItems.map(fileItem => fileItem.file);
        this.setState(state => ({
            claim: { ...state.claim, files: files}
        }));
    }

    handleSubmit = (e) => {
        console.log(this.state.claim.files);
        this.props.fileClaim(this.state.claim);
        e.preventDefault();
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep > 0 ?
                this.state.activeStep - 1 : this.state.activeStep
        })
    }

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    render() {
        const { t, classes, history, changeLocale } = this.props;
        const { activeStep, claim } = this.state;

        const steps = [
            t('claimProcessPage.steps.chooseType'),
            t('claimProcessPage.steps.details'),
            t('claimProcessPage.steps.success')
        ];

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
                <ParallaxSection t={t} classes={classes} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <ClaimBody
                            handleNext={this.handleNext}
                            handleBack={this.handleBack}
                            handleReset={this.handleReset}
                            steps={steps}
                            activeStep={activeStep}
                            classes={classes}
                            handleChange={this.handleChange}
                            handleUpdateFiles={this.handleUpdateFiles}
                            handleSubmit={this.handleSubmit}
                            t={t}
                            claim={claim}
                            history={history}
                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withStyles(claimProcessPageStyle)(ClaimProcessPage));