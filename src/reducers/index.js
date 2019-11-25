import { combineReducers } from 'redux';
import phoneBookReducer from './phoneBookReducer';

export default combineReducers({
    phoneBook: phoneBookReducer
});