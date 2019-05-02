import AuthTypes from 'redux/actions/auth/AuthTypes.jsx';

const defualtState = {
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds'),
    employee: !!localStorage.getItem('employee'),
    err: null
}

export default (state = defualtState, action) => {
    switch (action.type) {
        case AuthTypes.REGISTER_REQUEST:
            return {...state,
                isLoading: true,
                user: action.username,
                err: null
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
        case AuthTypes.LOGOUT_USER:
            return {
                isLoading: false,
                isAuthenticated: false,
                token: null,
                user: null,
                employee: null,
                err: null
            };
        default:
            return state;
    }
}