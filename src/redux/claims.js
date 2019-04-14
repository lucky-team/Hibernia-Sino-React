import * as ActionTypes from './ActionTypes';

export const Claims = (state = {
        isLoading: true,
        isHandling: false,
        errMess: null,
        claims: []
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_CLAIMS:
                return {...state, isLoading: false, errMess: null, claims: action.payload};
            case ActionTypes.CLAIMS_LOADING:
                return {...state, isLoading: true, errMess: null, claims: []};
            case ActionTypes.CLAIMS_FAILED:
                return {...state, isLoading: false, errMess: action.payload, claims: []};
            case ActionTypes.ASSIGN_CLAIMS_REQUEST:
                return {...state, isHandling: true, errMess: null};
            case ActionTypes.ASSIGN_CLAIMS_SUCCESS:
                return {...state, isHandling: false, errMess: null};
            case ActionTypes.ASSIGN_CLAIMS_FAILURE:
                return {...state, isHandling: false, errMess: action.payload};
            default:
                return state;
        }
}
