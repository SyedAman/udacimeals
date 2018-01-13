// define action types
export const ADD_RECIPE = 'ADD_RECIPE';
export const REMOVE_FROM_CALENDER = 'REMOVE_FROM_CALENDER';

/**
 * Action creator that creates an action indicating an a new recipe.
 * @method addRecipe
 * @param  {string} day - The day of the recipe.
 * @param  {string} recipe - The steps to cook the meal.
 * @param  {string} meal - The name of the meal.
 * @return {Object} - The action.
 */
export function addRecipe({ day, recipe, meal }) {
	return {
		type: ADD_RECIPE,
		day,
		recipe,
		meal,
	};
}

/**
 * Action creator that creates an action indicating removing a meal from the
 * calender.
 * @method removeFromCalender
 * @param  {string} day - The the meal is served.
 * @param  {string} meal - The name of the meal.
 * @return {Object} - The action.
 */
export function removeFromCalender({ day, meal }) {
	return {
		type: REMOVE_FROM_CALENDER,
		day,
		meal,
	};
}
