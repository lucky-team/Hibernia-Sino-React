import AuthTypes from 'store/actions/AuthTypes.jsx';
import { baseUrl } from 'store/BaseUrl.jsx';
import { CatchCodes } from 'store/actions/settings.jsx';

export const requestRegister = () => {
    return {
        type: AuthTypes.REGISTER_REQUEST
    }
}

export const receiveRegister = (msg) => {
    return {
        type: AuthTypes.REGISTER_SUCCESS,
        msg: msg
    }
}

export const registerError = (err) => {
    return {
        type: AuthTypes.REGISTER_FAILURE,
        err: err
    }
}

export const register = (creds) => (dispatch) => {
    dispatch(requestRegister());

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
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
            dispatch(receiveRegister(response.msg));
        } else {
            dispatch(registerError(response.err));
        }
    })
    .catch(error => dispatch(registerError(error.message)));
}
