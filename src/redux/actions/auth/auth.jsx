import AuthTypes from 'redux/actions/auth/AuthTypes.jsx';
import * as BaseUrl from 'routes/BaseUrl.jsx';
import { CatchCodes } from 'redux/actions/settings.jsx';
import { fetchProfiles } from 'redux/actions/profile/profile.jsx';
import { fetchInsurances } from 'redux/actions/insurance/insurance.jsx';
import { fetchClaims } from 'redux/actions/claim/claim.jsx';
import { enqueueSnackbar } from 'redux/actions/notification/notification.jsx';

export const logout = () => {
    return {
        type: AuthTypes.LOGOUT_USER
    }
}

// ******* register *******

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

export const register = (creds, history) => (dispatch) => {
    dispatch(requestRegister());

    return fetch(BaseUrl.baseUrl + 'users/signup', {
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
            dispatch(enqueueSnackbar({
                message: response.msg,
                options: {
                    variant: 'success',
                },
                field: 'actions.auth'
            }));
            history.push(BaseUrl.loginUrl);
        } else {
            dispatch(registerError(response.err));
            dispatch(enqueueSnackbar({
                message: response.err.message,
                options: {
                    variant: 'error',
                },
                field: 'actions.auth'
            }));
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

export const receiveLogin = ({ msg, employee}) => {
    return {
        type: AuthTypes.LOGIN_SUCCESS,
        msg: msg,
        employee: employee
    }
}

export const loginError = (err) => {
    return {
        type: AuthTypes.LOGIN_FAILURE,
        err: err
    }
}

export const login = (creds, history) => (dispatch) => {
    dispatch(requestLogin(creds.username));

    return fetch(BaseUrl.baseUrl + 'users/login', {
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
            dispatch(receiveLogin({
                msg: response.msg,
                employee: response.employee
            }));
            dispatch(enqueueSnackbar({
                message: response.msg,
                options: {
                    variant: 'success',
                },
                field: 'actions.auth'
            }));
            dispatch(fetchProfiles());
            dispatch(fetchInsurances());
            dispatch(fetchClaims());
            history.push(BaseUrl.profileUrl);
        } else {
            dispatch(loginError(response.err));
        }
    })
    .catch(err => dispatch(loginError(err.message)));
}
