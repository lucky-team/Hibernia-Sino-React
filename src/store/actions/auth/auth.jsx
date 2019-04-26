import AuthTypes from 'store/actions/auth/AuthTypes.jsx';
import { baseUrl } from 'routes/BaseUrl.jsx';
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
    .catch(err => dispatch(registerError(err.message)));
}

export const requestLogin = (username) => {
    return {
        type: AuthTypes.LOGIN_REQUEST,
        username
    }
}

export const receiveLogin = (msg) => {
    return {
        type: AuthTypes.LOGIN_SUCCESS,
        msg: msg
    }
}

export const loginError = (err) => {
    return {
        type: AuthTypes.LOGIN_FAILURE,
        err: err
    }
}

export const login = (creds) => (dispatch) => {
    dispatch(requestLogin(creds.username));

    return fetch(baseUrl + 'users/login', {
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
            localStorage.setItem('creds', creds.username);
            localStorage.setItem('token', response.token);
            if (response.employee) {
                localStorage.setItem('employee', 1);
            }
            dispatch(receiveLogin(response.msg));
        } else {
            dispatch(loginError(response.err));
        }
    })
    .catch(err => dispatch(loginError(err.message)));
}
