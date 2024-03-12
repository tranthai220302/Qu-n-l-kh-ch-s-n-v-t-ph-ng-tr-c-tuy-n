// store.js
import { createStore, combineReducers } from 'redux';
import bookingReducer from '../reducers/bookingReducer';
import roomReducer from '../reducers/roomReducer';

const rootReducer = combineReducers({
  booking: bookingReducer,
  room : roomReducer
});

const store = createStore(rootReducer);

export default store;
