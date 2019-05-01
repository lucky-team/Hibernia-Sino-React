import { createStore, combineReducers, applyMiddleware } from 'redux';
import Auth from 'store/reducers/auth.jsx';
import Profile from 'store/reducers/profile.jsx';
import Insurance from 'store/reducers/insurance.jsx';
import Claim from 'store/reducers/claim.jsx';
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