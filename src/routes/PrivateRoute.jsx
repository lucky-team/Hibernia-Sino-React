import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as BaseUrl from 'routes/BaseUrl';
import { connect } from 'react-redux';
import { enqueueSnackbar } from 'redux/actions/notification/notification.jsx';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification))
});

const PrivateRoute = ({ component: Component, redirectTo=BaseUrl.loginUrl, auth, enqueueSnackbar, ...rest }) => {
    return (
        <Route
        {...rest}
        render={props => {
            if (auth.isAuthenticated) {
                return <Component
                    auth={auth}
                    enqueueSnackbar={enqueueSnackbar}
                    {...props}
                />;
            } else {
                enqueueSnackbar({
                    message: 'Please sign in!',
                    options: {
                        variant: 'warning',
                    },
                    field: 'actions.auth'
                });
                return <Redirect to={redirectTo} />;
            }
        }}
        />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);