import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addRecipe, removeFromCalender } from '../actions';
import '../App.css';

class App extends Component {
	render() {
		console.log(this.props.calendar);
		return (
			<div>
				<h1>Learning Redux!</h1>
			</div>
		);
	}
}

/**
 * Creates props for accessing the application state from the component.
 * @method mapStateToProps
 * @param  {Object} calendar - A property in the redux store state.
 * @return {Object} - Available props to be used to read from the store.
 */
const mapStateToProps = calendar => ({
	calendar: Object.keys(calendar).map(day => ({ day, meals: calendar[day] })),
});

/**
 * Creates props for dispatching actions.
 * @method mapDispatchToProps
 * @param  {Function} dispatch - A function provided by react-redux  to dispatch
 * actions to the reducers.
 * @return {Object} - The available props to be used to dispatch actions.
 */
const mapDispatchToProps = dispatch => ({
	// add a recipe to a meal for a specified day in the calendar
	boundAddRecipe: ({ day, recipe, meal }) =>
		dispatch(addRecipe({ day, recipe, meal })),

	// remove a recipe from a meal from a specified day in the calendar
	boundRemoveFromCalendar: ({ day, meal }) =>
		dispatch(removeFromCalender({ day, meal })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
