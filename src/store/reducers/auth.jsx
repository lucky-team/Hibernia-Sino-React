import AuthTypes from 'store/actions/AuthTypes.jsx';

export default (state = {
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds'),
    err: null
}, action) => {
    switch (action.type) {
        case AuthTypes.REGISTER_REQUEST:
            return {...state,
                isLoading: true,
                user: action.username
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
        case AuthTypes.LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.username
            };
        case AuthTypes.LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                err: null
            };
        case AuthTypes.LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                err: action.err
            };
        default:
            return state;
    }
}