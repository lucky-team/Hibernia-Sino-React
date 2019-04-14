import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Signin from './Signin';
import * as BaseUrl from '../shared/BaseUrl';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText,
    Collapse  } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ExpandLess, ExpandMore, MoveToInbox } from '@material-ui/icons';


const styles = theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
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
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 10,
    }
});

const drawerWidth = 240;
let drawerContent = [
    {
        title: 'Insurance',
        open: true,
        items: [
            ['Pending', BaseUrl.employeeInsurancePending],
            ['Processing', BaseUrl.employeeInsuranceProcessing],
            ['Closed', BaseUrl.employeeInsuranceClosed]
        ]
    },
    {
        title: 'Claim',
        open: true,
        items: [
            ['Pending', BaseUrl.employeeClaimPending],
            ['Processing', BaseUrl.employeeClaimProcessing],
            ['Closed', BaseUrl.employeeClaimClosed]
        ]
    }
]

class RenderDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: this.props.content.map((block) => {
                return block.open
            })
        }
    }

    toggleNest = (index) => {
        this.setState(state => {
            let prev_open = state.open;
            prev_open[index] = !prev_open[index]
            return ({
                open: prev_open
            })
        })
    }

    render() {
        const { isDrawerOpen, toggleDrawer, classes, content } = this.props;
        const { open } = this.state;
        
        return (
            <SwipeableDrawer
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                onOpen={() => toggleDrawer(true)}
                onClose={() => toggleDrawer(false)}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant="h6" color="inherit" noWrap>EMPLOYEE</Typography>
                    <IconButton onClick={() => toggleDrawer(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List
                    component="nav"
                >
                {content.map((block, index) => (
                    <Fragment key={block.title}>
                        <ListItem button onClick={() => this.toggleNest(index)}>
                            <ListItemIcon>
                                <MoveToInbox />
                            </ListItemIcon>
                            <ListItemText inset primary={block.title} />
                            {open[index] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {block.items.map((item) => (
                                    <ListItem button key={item[0]}
                                        component={NavLink}
                                        to={item[1]}
                                        className={classes.nested} >
                                        {item[0]}
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Fragment>
                ))}
                </List>


            </SwipeableDrawer>

        );
    }
}

function RenderNavigationBar({ auth, invokeNavBtn, classes, toggleDialog, logoutUser }) {
    let NavigationMenu;
    let UserMenu;

    if (auth.employee) {
        NavigationMenu = () => {
            return (
                <Fragment>
                    <Typography variant="h5" color="inherit" className={classes.toolbarTitle} noWrap>Hibernia-Sino | employee</Typography>
                </Fragment>
            )
        };
    } else {
        NavigationMenu = () => {
            return (
                <Fragment>
                    <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>Hibernia-Sino</Typography>
                    <Button className={`${invokeNavBtn(BaseUrl.homePath)}`} to="/home" component={NavLink} ><Typography noWrap color="inherit">Home</Typography></Button>
                    <Button className={`${invokeNavBtn(BaseUrl.myServicesPath)}`} component={NavLink} to={BaseUrl.myServicesPath}><Typography noWrap color="inherit">My Services</Typography></Button>
                    <Button className={`${invokeNavBtn(BaseUrl.claimsPath)}`} component={NavLink} to={BaseUrl.claimsPath}><Typography noWrap color="inherit">Claims</Typography></Button>
                </Fragment>
            )
        };
    }

    if (auth.isAuthenticated) {
        UserMenu = () => {
            return (
                <Fab size="small" color="primary" className={classes.userIcon} onClick={logoutUser}>
                    <AccountCircle />
                </Fab>
            );
        }
    } else {
        UserMenu = () => {
            return (
                <Button className={classes.loginBtn} variant="contained" onClick={toggleDialog}>
                    Login
                </Button>
            );
        }
    }

    return (
        <Fragment>
            <NavigationMenu />
            <UserMenu />
        </Fragment>
    );
    
}

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: '',
            isDialogOpen: false,
            isDrawerOpen: false
        }

        this.invokeNavBtn = this.invokeNavBtn.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
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

    toggleDrawer = (open) => {
        this.setState({ isDrawerOpen: open });
    }


    render() {
        const { classes, auth } = this.props;
        const { isDialogOpen, isDrawerOpen } = this.state;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="static" color="primary" className={classNames(classes.appBar,
                        {[classes.appBarShift]: isDrawerOpen,})}>
                    <Toolbar>
                        {auth.employee && <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => this.toggleDrawer(true)}
                            className={classNames(classes.menuButton, isDrawerOpen && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>}
                        <RenderNavigationBar
                            classes={classes}
                            auth={auth} invokeNavBtn={this.invokeNavBtn}
                            toggleDialog={this.toggleDialog}
                            logoutUser={this.props.logoutUser} />
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={isDialogOpen}
                    onClose={this.toggleDialog}
                >
                    <Signin
                        loginUser={this.props.loginUser}
                        logoutUser={this.props.logoutUser}
                        toggleDialog={this.toggleDialog}
                        auth={auth} />
                </Dialog>
                {auth.employee && <RenderDrawer
                    classes={classes}
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={this.toggleDrawer}
                    invokeNavBtn={this.invokeNavBtn}
                    content={drawerContent} />}
            </React.Fragment>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);