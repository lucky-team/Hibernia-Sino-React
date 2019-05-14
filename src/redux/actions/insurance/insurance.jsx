import InsuranceTypes from 'redux/actions/insurance/InsuranceTypes.jsx';
import { baseUrl } from 'routes/BaseUrl.jsx';
import { CatchCodes } from 'redux/actions/settings.jsx';
import { enqueueSnackbar } from 'redux/actions/notification/notification.jsx';

// ******* fetch insurances *******

export const requestFetchInsurances = () => {
    return {
        type: InsuranceTypes.FETCH_INSURANCES_REQUEST
    }
}

export const receiveFetchInsurances = (insurances) => {
    return {
        type: InsuranceTypes.FETCH_INSURANCES_SUCCESS,
        insurances: insurances
    }
}

export const fetchInsurancesError = (err) => {
    return {
        type: InsuranceTypes.FETCH_INSURANCES_FAILURE,
        err: err
    }
}

export const fetchInsurances = (query) => (dispatch) => {
    dispatch(requestFetchInsurances());

    let url = baseUrl + 'insurances';
    if (query) {
        url += query
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(url, {
            methods: 'GET',
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
        if (Array.isArray(response)) {
            dispatch(receiveFetchInsurances(response));
        } else {
            dispatch(fetchInsurancesError(`${response.err.name}: ${response.err.message}`));
        }
    })
    .catch(err => dispatch(fetchInsurancesError(err.message)));
};

// ******* create insurance *******

export const requestCreateInsurance = () => ({
    type: InsuranceTypes.CREATE_INSURANCE_REQUEST
});

export const receiveCreateInsurance = (msg) => ({
    type: InsuranceTypes.CREATE_INSRUANCE_SUCCESS,
    msg: msg
});

export const createInsuranceError = (err) => ({
    type: InsuranceTypes.CREATE_INSRUANCE_FAILURE,
    err: err
});

export const createInsurance = (insurance) => (dispatch) => {
    dispatch(requestCreateInsurance());

    const bearer = 'Bearer ' + localStorage.getItem('token');
    const url = baseUrl + 'insurances';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insurance)
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
            dispatch(receiveCreateInsurance(response.msg));
            dispatch(enqueueSnackbar({
                message: response.msg,
                options: {variant: 'success'},
                field: 'actions.insurance'
            }));
        } else {
            dispatch(createInsuranceError(`${response.err.name}: ${response.err.message}`));
            dispatch(enqueueSnackbar({
                message: response.err.message,
                options: {variant: 'error'},
                field: 'actions.insurance'
            }));
        }
    })
    .catch(err => dispatch(createInsuranceError(err.message)));
}