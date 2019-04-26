import ProfileTypes from 'store/actions/profile/ProfileTypes.jsx';
import CommonTypes from 'store/actions/CommonTypes.jsx';

export default (state = {
    isLoading: false,
    content: [],
    self: null,
    err: null
}, action) => {
    switch (action.type) {
        case ProfileTypes.FETCH_PROFILE_REQUEST:
            return {...state,
                isLoading: true
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
        default:
            return state;
    }
}