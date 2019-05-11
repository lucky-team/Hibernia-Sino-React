import React, { useReducer, useEffect } from 'react';
import logger from 'use-reducer-logger';
import manageClaimReducer from 'redux/reducers/manageClaim.jsx';
import { updateClaims, assignClaim, acceptClaim, rejectClaim } from 'redux/actions/manageClaim/manageClaim.jsx';

import TabContentSection from 'views/Manage/ManageClaimPage/Sections/TabContentSection.jsx';

import NavPills from "components/NavPills/NavPills.jsx";

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

    useEffect(() => console.log('Mount: navpills section'), []);

    useEffect(() => {
        if (claims !== null && claims.length !== 0) {
            updateClaims(claims)(dispatch);
        }
    }, [claims]);

    return (
        <NavPills
            color='rose'
            tabs={[
                {
                    tabButton: t('manageClaimPage.table.all'),
                    tabContent: (
                        <TabContentSection
                            classes={classes}
                            claims={state.allClaims}
                            t={t}
                            history={history}
                            tableType={'all'}
                            assignClaim={(claimId) => assignClaim(claimId)(dispatch)}
                            acceptClaim={(claimId) => acceptClaim(claimId)(dispatch)}
                            rejectClaim={(claimId, rejectReason) => rejectClaim(claimId, rejectReason)(dispatch)}
                        />
                    )
                },
                {
                    tabButton: t('manageClaimPage.table.pending'),
                    tabContent: (
                        <TabContentSection
                            classes={classes}
                            claims={state.pendingClaims}
                            t={t}
                            history={history}
                            tableType={'pending'}
                            assignClaim={(claimId) => assignClaim(claimId)(dispatch)}
                        />
                    )
                },
                {
                    tabButton: t('manageClaimPage.table.processing'),
                    tabContent: (
                        <TabContentSection
                            classes={classes}
                            claims={state.processingClaims}
                            t={t}
                            history={history}
                            tableType={'processing'}
                            acceptClaim={(claimId) => acceptClaim(claimId)(dispatch)}
                            rejectClaim={(claimId, rejectReason) => rejectClaim(claimId, rejectReason)(dispatch)}
                        />
                    )
                },
                {
                    tabButton: t('manageClaimPage.table.finished'),
                    tabContent: (
                        <TabContentSection
                            classes={classes}
                            claims={state.finishedClaims}
                            t={t}
                            history={history}
                            tableType={'finished'}
                        />
                    )
                }
            ]}
        />
    )
};


export default NavpillsSection;