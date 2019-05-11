import ManageClaimTypes from 'redux/actions/manageClaim/ManageClaimTypes.jsx';

export default (state, action) => {
    const { allClaims, pendingClaims, processingClaims, closedClaims } = state;
    switch (action.type) {
        case ManageClaimTypes.ASSIGN_CLAIM_REQUEST:
            return state;

        case ManageClaimTypes.ASSIGN_CLAIM_SUCCESS:
            let processingItem;
            let newPendingClaims = pendingClaims.filter((el) => {
                let match = el['_id'] === action.claimId;
                if (match) {
                    processingItem = el;
                    return false;
                } else {
                    return true;
                }
            });
            processingItem.status = 'processing';
            let newProcessingClaimsAssign = processingClaims.concat([processingItem]);
            return {...state,
                pendingClaims: newPendingClaims,
                processingClaims: newProcessingClaimsAssign
            }

        case ManageClaimTypes.ASSIGN_CLAIM_FAILURE:
            return state;
        
        case ManageClaimTypes.ACCEPT_CLAIM_SUCCESS:
            let acceptItem;
            let newProcessingClaimsAccept = processingClaims.filter((el) => {
                let match = el['_id'] === action.claimId;
                if (match) {
                    acceptItem = el;
                    return false;
                } else {
                    return true;
                }
            });
            acceptItem.status = 'accepted';
            let newClosedClaimsAccept = processingClaims.concat([acceptItem]);
            return {...state,
                processingClaims: newProcessingClaimsAccept,
                closedClaims: newClosedClaimsAccept
            };

        case ManageClaimTypes.REJECT_CLAIM_SUCCESS:
            let rejectItem;
            let newProcessingClaims = processingClaims.filter((el) => {
                let match = el['_id'] === action.claimId;
                if (match) {
                    rejectItem = el;
                    return false;
                } else {
                    return true;
                }
            });
            rejectItem.status = 'rejected';
            let newClosedClaimsReject = processingClaims.concat([rejectItem]);
            return {...state,
                processingClaims: newPendingClaims,
                closedClaims: newClosedClaimsReject
            };

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