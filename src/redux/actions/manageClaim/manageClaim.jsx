import ManageClaimTypes from 'redux/actions/manageClaim/ManageClaimTypes.jsx';
import { CatchCodes } from 'redux/actions/settings.jsx';
import { enqueueSnackbar } from 'redux/actions/notification/notification.jsx';
import { baseUrl } from 'routes/BaseUrl';

// ******* assign claim ******

export const requestAssignClaim = (claimId) => ({
    type: ManageClaimTypes.ASSIGN_CLAIM_REQUEST,
    claimId: claimId,
});

export const receiveAssignClaim = ({ claimId, msg }) => ({
    type: ManageClaimTypes.ASSIGN_CLAIM_SUCCESS,
    claimId: claimId,
    msg: msg
});

export const assignClaimError = ({ claimId, err }) => ({
    type: ManageClaimTypes.ASSIGN_CLAIM_FAILURE,
    claimId: claimId,
    err: err
});

export const assignClaim = (claimId) => (dispatch) => {
    dispatch(requestAssignClaim(claimId));

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`${baseUrl}claims/assign/${claimId}`, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (CatchCodes.indexOf(response.status) >= 0) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            dispatch(receiveAssignClaim({
                claimId: claimId,
                msg: response.msg
            }));
            dispatch(enqueueSnackbar({
                message: response.msg,
                options: {variant: 'success'},
                field: 'actions.claim'
            }));
        } else {
            dispatch(assignClaimError({
                claimId: claimId,
                err: `${response.err.name}: ${response.err.message}`
            }));
            dispatch(enqueueSnackbar({
                message: response.err.message,
                options: {variant: 'error'},
                field: 'actions.claim'
            }));
        }
    })
    .catch(err => dispatch(assignClaimError({
        claimId: claimId,
        err: err.messsage
    })));
};

// ******* accept claim *******

export const requestAcceptClaim = (claimId) => ({
    type: ManageClaimTypes.ACCEPT_CLAIM_REQUEST,
    claimId: claimId
});

export const receiveAcceptClaim = ({ claimId, msg }) => ({
    type: ManageClaimTypes.ACCEPT_CLAIM_SUCCESS,
    claimId: claimId,
    msg: msg
});

export const acceptClaimError = ({ claimId, err }) => ({
    type: ManageClaimTypes.ACCEPT_CLAIM_FAILURE,
    claimId: claimId,
    err: err
});

export const acceptClaim = (claimId) => (dispatch) => {
    dispatch(requestAcceptClaim(claimId));

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`${baseUrl}claims/accept/${claimId}`, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (CatchCodes.indexOf(response.status) >= 0) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            dispatch(receiveAcceptClaim({
                claimId: claimId,
                msg: response.msg
            }));
            dispatch(enqueueSnackbar({
                message: response.msg,
                options: {variant: 'success'},
                field: 'actions.claim'
            }));
        } else {
            dispatch(acceptClaimError({
                claimId: claimId,
                err: `${response.err.name}: ${response.err.message}`
            }));
            dispatch(enqueueSnackbar({
                message: response.err.message,
                options: {variant: 'error'},
                field: 'actions.claim'
            }));
        }
    })
    .catch(err => dispatch(acceptClaimError({
        claimId: claimId,
        err: err.messsage
    })));
}

// ******* reject claim *******

export const requestRejectClaim = (claimId) => ({
    type: ManageClaimTypes.REJECT_CLAIM_REQUEST,
    claimId: claimId
});

export const receiveRejectClaim = (claimId, msg) => ({
    type: ManageClaimTypes.REJECT_CLAIM_SUCCESS,
    claimId: claimId,
    msg: msg
});

export const rejectClaimError = ({ claimId, err }) => ({
    type: ManageClaimTypes.REJECT_CLAIM_FAILURE,
    claimId: claimId,
    err: err
});

export const rejectClaim = (claimId, rejectReason) => dispatch => {
    dispatch(requestRejectClaim(claimId));
    const body = {
        rejectReason: rejectReason
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(`${baseUrl}claims/reject/${claimId}`, {
        method: 'POST',
        headers: {
            'Authorization': bearer
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (CatchCodes.indexOf(response.status) >= 0) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            dispatch(receiveRejectClaim({
                claimId: claimId,
                msg: response.msg
            }));
            dispatch(enqueueSnackbar({
                message: response.msg,
                options: {variant: 'success'},
                field: 'actions.claim'
            }));
        } else {
            dispatch(rejectClaimError({
                claimId: claimId,
                err: `${response.err.name}: ${response.err.message}`
            }));
            dispatch(enqueueSnackbar({
                message: response.err.message,
                options: {variant: 'error'},
                field: 'actions.claim'
            }));
        }
    })
    .catch(err => dispatch(rejectClaimError({
        claimId: claimId,
        err: err.messsage
    })));
}

export const receiveUpdateClaims = ({ all, pending, processing, finished }) => ({
    type: ManageClaimTypes.UPDATE_CLAIMS,
    allClaims: all,
    pendingClaims: pending,
    processingClaims: processing,
    finishedClaims: finished
})

export const updateClaims = (claims) => (dispatch) => {
    let all = [];
    let pending = [];
    let processing = [];
    let finished = [];
    all = claims.map(item => {
        switch (item.status) {
            case 'pending':
                pending.push(item);
                break;
            case 'processing':
                processing.push(item);
                break;
            case 'accepted':
                finished.push(item);
                break;
            case 'rejected':
                finished.push(item);
                break;
            default:
                break;
        }
        return item;
    });
    dispatch(receiveUpdateClaims({
        all: all,
        pending: pending,
        processing: processing,
        finished: finished
    }));
};
