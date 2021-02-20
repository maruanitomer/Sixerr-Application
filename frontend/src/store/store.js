import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import { gigReducer } from './reducers/gigReducer.js'
import { userReducer } from './reducers/userReducer.js';
import { orderReducer } from './reducers/orderReducer.js';

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    orderModule: orderReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
