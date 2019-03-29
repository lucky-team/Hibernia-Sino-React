import * as ActionTypes from './ActionTypes';

export const Insurances = (state = {
        isLoading: true,
        errMess: null,
        insurances: []
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_INSURANCES:
                return {...state, isLoading: false, errMess: null, insurances: action.payload};
            case ActionTypes.INSURANCES_LOADING:
                return {...state, isLoading: true, errMess: null, insurances: []};
            case ActionTypes.INSURANCES_FAILED:
                return {...state, isLoading: false, errMess: action.payload, insurances: []};
            default:
                return state;
        }
}
