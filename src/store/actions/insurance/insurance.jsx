import InsuranceTypes from 'store/actions/insurance/InsuranceTypes.jsx';
import { baseUrl } from 'routes/BaseUrl.jsx';
import { CatchCodes } from 'store/actions/settings.jsx';

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
}