import InsuranceTypes from 'store/actions/insurance/InsuranceTypes';
import AuthTypes from 'store/actions/auth/AuthTypes.jsx';

const defaultState = {
    isLoading: false,
    content: null,
    msg: null,
    err: null
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case InsuranceTypes.FETCH_INSURANCES_REQUEST:
            return {...state,
                isLoading: true,
                err: null
            };
        case InsuranceTypes.FETCH_INSURANCES_SUCCESS:
            return {...state,
                isLoading: false,
                content: action.insurances
            }
        case InsuranceTypes.FETCH_INSURANCES_FAILURE:
            return {...state,
                isLoading: false,
                err: action.err
            }
        case AuthTypes.LOGOUT_USER:
            return defaultState;
        default:
            return state;
    }
}