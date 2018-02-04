import { ADD_RECIPE } from '../actions';

/**
 * Returns an updated version of the state in relation to food state, based on
 * the food action received.
 * @method foodReducer
 * @param  {Object} [state={}] - The redux store.
 * @param  {Object} action - The payload.
 * @return {Object} - An updated version of the state.
 */
const foodReducer = (state = {}, action) => {
	const { recipe } = action;

	switch (action.type) {
		case ADD_RECIPE:
			return {
				...state,
				[recipe.label]: recipe,
			};
		default:
			return state;
	}
};

export default foodReducer;
