import ProfileTypes from 'redux/actions/profile/ProfileTypes.jsx';
import AuthTypes from 'redux/actions/auth/AuthTypes.jsx';

const defaultState = {
    isLoading: false,
    content: null,
    self: null,
    msg: null,
    err: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ProfileTypes.FETCH_PROFILE_REQUEST:
            return {...state,
                isLoading: true,
                err: null
            };
        case ProfileTypes.FETCH_SELF_PROFILE_SUCCESS:
            return {...state,
                isLoading: false,
                self: action.profile
            }
        case ProfileTypes.FETCH_SELF_PROFILE_FAILURE:
            return {...state,
                isLoading: false,
                self: null,
                err: action.err
            }
        case ProfileTypes.FETCH_PROFILES_FAILURE:
            return {...state,
                isLoading: false,
                self: null,
                err: action.err
            }
        case ProfileTypes.CREATE_PROFILE_REQUEST: {
            return {...state,
                isLoading: true,
                msg: null,
                err: null
            }
        }
        case ProfileTypes.CREATE_PROFILE_SUCCESS: {
            return {...state,
                isLoading: false,
                msg: action.msg,
                self: action.profile
            }
        }
        case ProfileTypes.CREATE_PROFILE_FAILURE: {
            return {...state,
                isLoading: false,
                err: action.err
            }
        }
        case ProfileTypes.UPDATE_PROFILE_REQUEST: {
            return {...state,
                isLoading: true,
                msg: null,
                err: null
            }
        }
        case ProfileTypes.UPDATE_PROFILE_SUCCESS: {
            return {...state,
                isLoading: false,
                msg: action.msg,
                self: action.profile
            }
        }
        case ProfileTypes.UPDATE_PROFILE_FAILURE: {
            return {...state,
                isLoading: false,
                err: action.err
            }
        }
        case AuthTypes.LOGOUT_USER:
            return defaultState;
        default:
            return state;
    }
}