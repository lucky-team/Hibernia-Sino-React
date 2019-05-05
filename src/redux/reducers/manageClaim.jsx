import ManageClaimTypes from 'redux/actions/manageClaim/ManageClaimTypes.jsx';

export default (state, action) => {
    const { allClaims, pendingClaims, processingClaims, closedClaims } = state;
    switch (action.type) {
        case ManageClaimTypes.ASSIGN_CLAIM_REQUEST:
            return state;

        case ManageClaimTypes.ASSIGN_CLAIM_SUCCESS:
            let processingItem;
            const newPendingClaims = pendingClaims.filter((el) => {
                const match = el['_id'] === action.claimId;
                if (match) {
                    processingItem = el;
                    return false;
                } else {
                    return true;
                }
            });
            processingItem.status = 'processing';
            const newProcessingClaims = processingClaims.concat([processingItem]);
            return {...state,
                pendingClaims: newPendingClaims,
                processingClaims: newProcessingClaims
            }

        case ManageClaimTypes.ASSIGN_CLAIM_FAILURE:
            return state;

        case ManageClaimTypes.UPDATE_CLAIMS:
            return {...state,
                allClaims: action.allClaims,
                pendingClaims: action.pendingClaims,
                processingClaims: action.processingClaims,
                finishedClaims: action.finishedClaims
            }

        default: 
            return state;
    }
};