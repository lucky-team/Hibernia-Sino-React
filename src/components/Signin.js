import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import Fade from '@material-ui/core/Fade';
import Back from './common/Back';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        minWidth: '320px'
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    buttonBar: {
        marginTop: theme.spacing.unit * 3,
        justifyContent: 'center',
    },
    back: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    }
});

class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        //destructuring to get the variables
        let { name, value } = e.target
        //setting state whith the value of "name" as the key
        this.setState({ [name]: value })
    }

    handleLogin(event) {
        this.props.loginUser({username: this.state.username, password: this.state.password});
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <div className={classes.back}>
                        <Back pathname='/home' text='Back' />
                    </div>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" noWrap>
                        Sign in to Hibernia-Sino
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleLogin}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" name="username" autoComplete="username" autoFocus
                                value={this.state.username} onChange={this.handleChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" 
                            autoComplete="current-password" value={this.state.password}
                            onChange={this.handleChange} />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Grid container spacing={16} className={classes.buttonBar}>
                            <Grid item xs={12} sm={6} align-items-xs-flex-end="true" >
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                            </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} align-items-xs-flex-start="true" >
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign in
                            </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Signin))
