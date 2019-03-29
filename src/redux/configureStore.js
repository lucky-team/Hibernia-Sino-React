import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import { Insurances } from './insurances';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            insurances: Insurances
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}