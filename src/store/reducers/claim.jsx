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
        case ClaimTypes.FETCH_CLAIMS_REQUEST:
            return {...state,
                isLoading: true
            }
        case ClaimTypes.FETCH_CLAIMS_SUCCESS:
            return {...state,
                isLoading: false,
                content: action.claims
            }
        case ClaimTypes.FETCH_CLAIMS_FAILURE:
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