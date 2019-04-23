import AuthTypes from 'store/actions/AuthTypes.jsx';

export default (state = {
    isLoading: false,
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    err: null
}, action) => {
    switch (action.type) {
        case AuthTypes.REGISTER_REQUEST:
            return {...state,
                isLoading: true,
                user: action.creds
            };
        case AuthTypes.REGISTER_SUCCESS:
            return {...state,
                isLoading: false,
                err: null
            };
        case AuthTypes.REGISTER_FAILURE:
            return {...state,
                isLoading: false,
                err: action.err
            };
        default:
            return state;
    }
}