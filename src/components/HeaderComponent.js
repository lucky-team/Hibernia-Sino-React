import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Signin from './Signin';

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
        if (pathname === window.location.pathname) {
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
                        <Button className={`${this.invokeNavBtn('/home')}`} to="/home" component={NavLink} >
                            Home
                        </Button>
                        <Button className={`${this.invokeNavBtn('/product')}`} component={NavLink} to="/product">
                            Product
                        </Button>
                        <Button className={`${this.invokeNavBtn('/purchased_insurances')}`} component={NavLink} to="/purchased_insurances">
                            Insurances
                        </Button>
                        <Button className={`${this.invokeNavBtn('/claims')}`} component={NavLink} to="/claims">
                            Claims
                        </Button>
                        <Button className={classes.loginBtn} variant="contained" onClick={this.toggleDialog}>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={this.state.isDialogOpen}
                    onClose={this.toggleDialog}
                >
                    <Signin
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                    toggleDialog={this.toggleDialog} />
                </Dialog>
            </React.Fragment>
        );   
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);