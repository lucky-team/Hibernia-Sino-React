import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>Authenticated</div>
        ) : (
            <div>Not Authenticated</div>
        )
     )} />
);
export default PrivateRoute;