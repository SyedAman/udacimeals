import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';
import recipeReducer from './recipeReducer';

export default combineReducers({
	calendar: calendarReducer,
	recipe: recipeReducer,
});
