import { createStore, combineReducers } from 'redux';
import { authReducer } from './authReducer.js';
import { cartReducer } from './cartReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
