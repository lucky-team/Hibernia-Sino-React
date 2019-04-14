import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/BaseUrl';
import axios from 'axios';

// ------- Login -------

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}

export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}

export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
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
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            localStorage.setItem('employee', response.employee);
            if (response.employee) {
                dispatch(fetchClaims());
            } else {
                dispatch(fetchInsurances());
            }
            dispatch(receiveLogin(response));
        } else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)));
}

// ------- Logout -------

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('employee');
    dispatch(clearInsurances());
    dispatch(receiveLogout());
}

// ------- Insurances -------

export const fetchInsurances = () => (dispatch) => {
    dispatch(insurancesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'insurances', {
        headers: {  
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(insurances => dispatch(addInsurances(insurances)))
    .catch(error => dispatch(insuranceFailed(error.message)));
}

export const addInsurances = (insurances) => ({
    type: ActionTypes.ADD_INSURANCES,
    payload: insurances
});

export const clearInsurances = (insurances) => ({
    type: ActionTypes.CLEAR_INSURANCES
})

export const insurancesLoading = () => ({
    type: ActionTypes.INSURANCES_LOADING
});

export const insuranceFailed = (errmess) => ({
    type: ActionTypes.INSURANCES_FAILED,
    payload: errmess
});

// ------- Claims -------

// customers

export const postClaim = (claim) => (dispatch => {
    claim['date'] = new Date(claim['date']).toISOString();
    console.log('Claim: ', claim);
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
    return axios.post(baseUrl + 'claims', formdata, {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': bearer}})
    .then(response => {
        // return response;
        if (response.status === 200) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.data)
    .then(response => {
        if (response.success) {
            fetchInsurances();
        }
    })
    .catch(error => { console.log('Claim ', error.message);})
})

export const fetchClaims = () => ((dispatch) => {
    dispatch(claimsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'claims', {
        headers: {  
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(claims => dispatch(addClaims(claims)))
    .catch(error => dispatch(claimsFailed(error.message)));
});

export const addClaims = (claims) => ({
    type: ActionTypes.ADD_CLAIMS,
    payload: claims
});

export const claimsLoading = () => ({
    type: ActionTypes.CLAIMS_LOADING
});

export const claimsFailed = (errmess) => ({
    type: ActionTypes.CLAIMS_FAILED,
    payload: errmess
})