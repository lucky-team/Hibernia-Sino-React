import * as ActionTypes from './ActionTypes';

export const Claims = (state = {
        isLoading: true,
        errMess: null,
        claims: []
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_INSURANCES:
                return {...state, isLoading: false, errMess: null, claims: action.payload};
            case ActionTypes.INSURANCES_LOADING:
                return {...state, isLoading: true, errMess: null, claims: []};
            case ActionTypes.INSURANCES_FAILED:
                return {...state, isLoading: false, errMess: action.payload, claims: []};
            default:
                return state;
        }
}
