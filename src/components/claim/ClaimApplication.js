import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Back from '../common/Back';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import * as BaseUrl from '../../shared/BaseUrl';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary['A100'],
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: '0 400px',
        marginTop: 10,
        padding: 20,
        paddingBottom: 500
    },
    grid: {
        margin: `0 ${theme.spacing.unit * 2}px`
    },
    smallContainer: {
        width: '60%'
    },
    bigContainer: {
        width: '80%'
    },
    title: {
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'center'
    },
    stepContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    stepGrid: {
        width: '80%'
    },
    buttonBar: {
        marginTop: 32,
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: theme.palette.primary['A100']
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    stepper: {
        backgroundColor: 'transparent'
    },
    paper: {
        padding: theme.spacing.unit * 3,
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    details: {
        padding: theme.spacing.unit * 5
    },
    input: {
        display: 'none',
    },
})

class ClaimProcess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            accidentType: 0,
            termsChecked: false,
            loading: true,
            labelWidth: 0,
            files: []
        }
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
        if (this.state.activeStep === 2) {
            setTimeout(() => this.props.history.push(BaseUrl.claimsPath), 5000)
        }
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleFileUpload = (event) => {
        this.setState({
            files: event.target.files
        });
    };

    handleChange = type => {
        this.setState({ accidentType: type });
        this.handleNext();
    };

    handleTerms = event => {
        this.setState({ termsChecked: event.target.checked });
    };

    handleForm = event => {
        
    }

    getFilesName = () => {
        let items = [];
        Array.from(this.state.files).forEach(file => {
            items.push(<li key={file.name}>{file.name}</li>)
        })
        return items;
    }

    render() {

        const { classes } = this.props;
        const steps = [
            'Choose Accident Type',
            'Filling Details',
            'Permission'
        ];
        const { activeStep, loading } = this.state;

        const tiers = [
            {
                type: 1,
                detail: "Passenger transport suffers from natural disasters" +
                    "such as rainstorm, lightning and so on"
            },
            {
                type: 2,
                detail: "Passenger transport suffered fire, eplosion, collision and overturn"
            },
            {
                type: 3,
                detail: "Theft, robbery, loss of luggage"
            },
        ];

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Back pathname={BaseUrl.claimsPath} text="Back" />
                    <Grid container justify="center">
                        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="inherit" noWrap className={classes.title}>
                                    Claim Application
                                 </Typography>
                                <div className={classes.stepContainer}>
                                    <div className={classes.stepGrid}>
                                        <Stepper classes={{ root: classes.stepper }} activeStep={activeStep} alternativeLabel>
                                            {steps.map(label => {
                                                return (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                    </div>
                                    {activeStep === 0 && (
                                        <div className={classes.smallContainer}>
                                            <Paper className={classes.paper}>
                                                <div>
                                                    <div style={{ marginBottom: 32 }}>
                                                        <Typography variant="subtitle1" style={{ fontWeight: 'bold' }} gutterBottom>
                                                            Choose Accident Type
                                                        </Typography>
                                                        <Typography variant="body1" gutterBottom>
                                                            Choose Accident Type
                                                        </Typography>
                                                    </div>
                                                    <Grid container spacing={40} alignItems="center">
                                                        {tiers.map(tier => (
                                                            <Grid item key={tier.title} xs={12} md={4}>
                                                                <Card>
                                                                    <CardHeader
                                                                        title={`Type ${tier.type}`}
                                                                        titleTypographyProps={{ align: 'center' }}
                                                                    />
                                                                    <CardContent>
                                                                        {tier.detail}
                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Button fullWidth
                                                                            color="primary" onClick={() => this.handleChange(tier.type)}>
                                                                            Select
                                                                        </Button>
                                                                    </CardActions>
                                                                </Card>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </div>
                                            </Paper>
                                        </div>
                                    )}
                                    {activeStep === 1 && (
                                        <div className={classes.smallContainer}>
                                            <Paper className={classes.paper}>
                                                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }} gutterBottom>
                                                    Filling Details
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    Filling Details
                                                </Typography>
                                                <form id="claims_form" onSubmit={this.handleForm}>
                                                <Grid container spacing={24} className={classes.details}>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            required
                                                            id="location"
                                                            name="location"
                                                            label="Accident Location"
                                                            autoComplete="location"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            required
                                                            type="date"
                                                            id="date"
                                                            name="date"
                                                            label="Accident Date"
                                                            variant="outlined"
                                                            autoComplete="date"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            required
                                                            id="amount"
                                                            name="amount"
                                                            label="Amount of Damages"
                                                            variant="outlined"
                                                            autoComplete="amount"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            required
                                                            type="type"
                                                            id="type"
                                                            name="type"
                                                            label="Type"
                                                            variant="outlined"
                                                            value={this.state.accidentType}
                                                            disabled
                                                            autoComplete="type"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            required
                                                            id="reason"
                                                            name="reason"
                                                            label="Reason"
                                                            fullWidth
                                                            autoComplete="location"
                                                            rows="4"
                                                            rowsMax="4"
                                                            variant="filled"
                                                            multiline
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <input
                                                            accept="*"
                                                            className={classes.input}
                                                            id="contained-button-file"
                                                            multiple
                                                            type="file"
                                                            onInput={(file) => this.handleFileUpload(file)}
                                                        />
                                                        <label htmlFor="contained-button-file">
                                                            <Button variant="contained" component="span" className={classes.button}>
                                                                Claim Supporting Files
                                                            </Button>
                                                        </label>
                                                        {this.state.files.length !== 0 &&
                                                            this.getFilesName()
                                                        }
                                                    </Grid>
                                                </Grid>
                                                </form>
                                            </Paper>
                                            <div className={classes.buttonBar}>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}
                                            size='large'
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            size='large'
                                            type="submit"
                                            form="claims_form"
                                            style={{ background: classes.button, color: 'white' }}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                        </div>
                                        
                                    )}
                                    {activeStep === 2 && (
                                        <div className={classes.bigContainer}>
                                            <Paper className={classes.paper}>
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <div style={{ width: 380, textAlign: 'center' }}>
                                                        <div style={{ marginBottom: 32 }}>
                                                            <Typography variant="h6" style={{ fontWeight: 'bold' }} gutterBottom>
                                                                Collecting your data
                                                            </Typography>
                                                            <Typography variant="body1" gutterBottom>
                                                                We are processing your request
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Fade
                                                                in={loading}
                                                                style={{
                                                                    transitionDelay: loading ? '400ms' : '0ms',
                                                                }}
                                                                unmountOnExit
                                                            >
                                                                <CircularProgress style={{ marginBottom: 32, width: 100, height: 100 }} />
                                                            </Fade>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    )}
                                    
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(ClaimProcess))
