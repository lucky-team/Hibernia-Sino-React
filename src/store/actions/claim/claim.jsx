import ClaimTypes from 'store/actions/claim/ClaimTypes';
import { baseUrl } from 'routes/BaseUrl.jsx';
import { CatchCodes } from 'store/actions/settings.jsx';
import moment from 'moment';
import axios from 'axios';

// ******* create claim *******

export const requestFileClaim = () => {
    return {
        type: ClaimTypes.FILE_CLAIM_REQUEST
    }
}

export const receiveFileClaim = (msg) => {
    return {
        type: ClaimTypes.FILE_CLAIM_SUCCESS,
        msg: msg
    }
}

export const fileClaimError = (err) => {
    return {
        type: ClaimTypes.FILE_CLAIM_FAILURE,
        err: err
    }
}

export const fileClaim = (claim) => (dispatch) => {
    dispatch(requestFileClaim());

    const date = claim['date'].toISOString();
    claim['date'] = date;
    var formdata = new FormData();
    let id = 0;
    Array.from(claim['files']).forEach((file) => {
        id++;
        formdata.append(String(id), file);
    });
    delete claim['files'];
    for (var name in claim) {
        formdata.append(name, claim[name]);
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return axios.post(baseUrl + 'claims', formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
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
    .then(response => response.data)
    .then(response => {
        if (response.success) {
            dispatch(receiveFileClaim(response.msg));
        } else {
            dispatch(fileClaimError(`${response.err.name}: ${response.err.message}`))
        }
    })
    .catch(err => dispatch(fileClaimError(err.message)));
}