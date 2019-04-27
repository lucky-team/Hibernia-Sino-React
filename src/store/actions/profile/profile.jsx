import ProfileTypes from 'store/actions/profile/ProfileTypes.jsx';
import { baseUrl } from 'routes/BaseUrl.jsx';
import { CatchCodes } from 'store/actions/settings.jsx';

// ******* fetch profile *******

export const requestFetchProfile = () => {
    return {
        type: ProfileTypes.FETCH_PROFILE_REQUEST
    }
}

export const receiveSelfProfile = (profile) => {
    return {
        type: ProfileTypes.FETCH_SELF_PROFILE_SUCCESS,
        profile: profile
    }
}

export const fetchSelfProfileError = (err) => {
    return {
        type: ProfileTypes.FETCH_SELF_PROFILE_FAILURE,
        err: err
    }
}

export const receiveProfiles = (profiles) => {
    return {
        type: ProfileTypes.FETCH_PROFILES_SUCCESS,
        profiles: profiles
    }
}

export const fetchProfileError = (err) => {
    return {
        type: ProfileTypes.FETCH_PROFILES_FAILURE,
        err: err
    }
}

export const fetchProfiles = (query) => (dispatch) => {
    dispatch(requestFetchProfile());

    let url = baseUrl + 'profiles';
    if (query) {
        url += query
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (CatchCodes.indexOf(response.status) >= 0) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    })
    .then(response => response.json())
    .then(response => {
        if (query) {
            // TODO profiles on employees side
        } else {
            if (Array.isArray(response)) {
                dispatch(receiveSelfProfile(response.length ? response[0] : response));
            } else {
                let error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        }
    })
    .catch(err => dispatch(query ?
        fetchProfileError(err.message)
        :
        fetchSelfProfileError(err.message)));
}

// ******* create profile *******

export const requestCreateProfile = () => {
    return {
        type: ProfileTypes.CREATE_PROFILE_REQUEST
    }
}

export const receiveCreateProfile = (msg) => {
    return {
        type: ProfileTypes.CREATE_PROFILE_SUCCESS,
        msg: msg
    }
}

export const createProfileError = (err) => {
    return {
        type: ProfileTypes.CREATE_PROFILE_FAILURE,
        err: err
    }
}

export const createProfile = (profile) => (dispatch) => {
    dispatch(requestCreateProfile());

    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'profiles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(profile)
    })
    .then(response => {
        if (CatchCodes.indexOf(response.status) >= 0) {
            return response;
        } else {
            let error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            dispatch(receiveCreateProfile(response.msg));
        } else {
            dispatch()
        }
    })
}