import { ADD_RECIPE } from '../actions';

/**
 * Returns an updated version of the state in relation to recipe state, based on
 * the recipe action received.
 * @method recipeReducer
 * @param  {Object} [state={}] - The redux store.
 * @param  {Object} action - The payload.
 * @return {Object} - An updated version of the state.
 */
const recipeReducer = (state = {}, action) => {
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

export default recipeReducer;
