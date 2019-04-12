import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Insurances } from './insurances';
import { Claims } from './claims';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            insurances: Insurances,
            claims: Claims
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}