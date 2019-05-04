import React, { useReducer, useEffect } from 'react';
import manageClaimReducer from 'redux/reducers/manageClaim.jsx';
import { updateClaims } from 'redux/actions/manageClaim/manageClaim.jsx';

const initialState = {
    allClaims: [],
    pendingClaims: [],
    processingClaims: [],
    finishedClaims: []
};

const NavpillsSection = ({ ...props }) => {
    const {
        t,
        classes,
        insurances,
        claims,
        history
    } = props;

    const [state, dispatch] = useReducer(manageClaimReducer, initialState);

    useEffect(() => {
        if (claims !== null && claims.length !== 0) {
            updateClaims(claims)(dispatch);
        }
    }, [claims]);
    console.log(claims);
    console.log(state);

    return (
        <div>Test</div>
    )
};


export default NavpillsSection;