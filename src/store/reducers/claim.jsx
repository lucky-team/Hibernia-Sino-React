import ClaimTypes from 'store/actions/claim/ClaimTypes.jsx';
import AuthTypes from 'store/actions/auth/AuthTypes.jsx';

const defaultState = {
    isLoading: false,
    content: null,
    msg: null,
    err: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ClaimTypes.FILE_CLAIM_REQUEST:
            return {...state,
                isLoading: true,
                msg: null,
                err: null
            }
        case ClaimTypes.FILE_CLAIM_SUCCESS:
            return {...state,
                msg: action.msg
            }
        case ClaimTypes.FILE_CLAIM_FAILURE:
            return {...state,
                err: action.err
            }
        case AuthTypes.LOGOUT_USER:
            return defaultState;
        default:
            return state;
    }
}