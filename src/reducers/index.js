import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';
import foodReducer from './foodReducer';

export default combineReducers({
	calendar: calendarReducer,
	food: foodReducer,
});
