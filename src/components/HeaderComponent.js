import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Signin from './Signin';
import * as BaseUrl from '../shared/BaseUrl';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    navLink: {
        color: 'inherit',
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    activeNavLink: {
        color: 'inherit',
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    },
    loginBtn: {
        marginLeft: theme.spacing.unit * 5,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        }
    },
    userIcon: {
        marginLeft: theme.spacing.unit * 5,
    }
});

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: '',
            isDialogOpen: false
        }

        this.invokeNavBtn = this.invokeNavBtn.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggleDialog() {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        })
    }

    invokeNavBtn(pathname) {
        if (window.location.pathname.startsWith(pathname)) {
            return this.props.classes.activeNavLink;
        } else {
            return this.props.classes.navLink;
        }
    }

    
    render () {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
                            Hibernia-Sino
                        </Typography>
                        <Button className={`${this.invokeNavBtn(BaseUrl.homePath)}`} to="/home" component={NavLink} >
                            Home
                        </Button>
                        <Button className={`${this.invokeNavBtn(BaseUrl.myServicesPath)}`} component={NavLink} to={BaseUrl.myServicesPath}>
                            My Services
                        </Button>
                        <Button className={`${this.invokeNavBtn(BaseUrl.claimsPath)}`} component={NavLink} to={BaseUrl.claimsPath}>
                            Claims
                        </Button>
                        {this.props.auth.isAuthenticated ? (
                            <Fab size="small" color="primary" className={classes.userIcon} onClick={this.props.logoutUser}>
                                <AccountCircle />
                            </Fab>
                        )
                        :
                        (
                            <Button className={classes.loginBtn} variant="contained" onClick={this.toggleDialog}>
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={this.state.isDialogOpen}
                    onClose={this.toggleDialog}
                >
                    <Signin
                        loginUser={this.props.loginUser}
                        logoutUser={this.props.logoutUser}
                        toggleDialog={this.toggleDialog}
                        auth={this.props.auth} />
                </Dialog>
            </React.Fragment>
        );   
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);