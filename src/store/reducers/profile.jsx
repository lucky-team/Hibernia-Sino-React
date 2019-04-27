import ProfileTypes from 'store/actions/profile/ProfileTypes.jsx';
import CommonTypes from 'store/actions/CommonTypes.jsx';
import AuthTypes from 'store/actions/auth/AuthTypes.jsx';

const defaultState = {
    isLoading: false,
    content: [],
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
        case CommonTypes.CLEAR_ERROR:
            return {...state,
                err: null
            };
        case CommonTypes.CLEAR_STORE:
            return {
                isLoading: false,
                content: [],
                self: null,
                err: null
            };
        case AuthTypes.LOGOUT_USER:
            return defaultState;
        default:
            return state;
    }
}