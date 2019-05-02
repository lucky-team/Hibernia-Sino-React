import { createStore, combineReducers, applyMiddleware } from 'redux';
import Auth from 'redux/reducers/auth.jsx';
import Profile from 'redux/reducers/profile.jsx';
import Insurance from 'redux/reducers/insurance.jsx';
import Claim from 'redux/reducers/claim.jsx';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            profile: Profile,
            insurance: Insurance,
            claim: Claim
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}