import { ADD_RECIPE, REMOVE_FROM_CALENDER } from '../actions';

/**
 * The shape/format of the application state.
 * @type {Object}
 */
const initialCalenderState = {
	sunday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	monday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	tuesday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	wednesday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	thursday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	friday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	saturday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
};

/**
 * Returns an updated version of the state depending on the action received.
 * @method calendarReducer
 * @param  {object} [state=initialCalenderState] - The application state.
 * @param  {object} action - The event or task to be performed to the state.
 * @return {object} - The updated version of the state.
 */
const calendarReducer = (state = initialCalenderState, action) => {
	const { day, recipe, meal } = action;

	switch (action.type) {
		case ADD_RECIPE:
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: recipe.label,
				},
			};
		case REMOVE_FROM_CALENDER:
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: null,
				},
			};
		default:
			return state;
	}
};

export default calendarReducer;
