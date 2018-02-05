import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';

import { addRecipe, removeFromCalender } from '../actions';
import { capitalize } from '../utils/helpers';
import '../App.css';

class App extends Component {
	/**
	 * Local state.
	 * @type {Object}
	 */
	state = {
		isLoading: false,
		isModalOpen: false,
		meal: null,
		day: null,
		food: null,
	};

	/**
	 * Opens the modal to edit meals for a day.
	 * @method openModal
	 * @param  {Object} meal - The meal (breakfast, lunch, or dinner) to update.
	 * @param  {Object} day - The day of the week to update the meal for.
	 * @return {Undefined}
	 */
	openModal = ({ meal, day }) => {
		this.setState(() => ({ isModalOpen: true, meal, day }));
	};

	/**
	 * Closes the modal for editing meals for a day.
	 * @method closeModal
	 * @return {Undefined}
	 */
	closeModal = () => {
		this.setState(() => ({
			isModalOpen: false,
			meal: null,
			day: null,
			food: null,
		}));
	};

	render() {
		const { calendar, boundRemoveFromCalendar } = this.props;
		/**
		 * The meals to be displayed the information of.
		 * @type {Array}
		 */
		const mealOrder = ['breakfast', 'lunch', 'dinner'];

		return (
			<div className="container">
				{/* display the different meal types in the x axis */}
				<ul className="meal-types">
					{mealOrder.map(mealType => (
						<li key={mealType} className="subheader">
							{capitalize(mealType)}
						</li>
					))}
				</ul>

				{/* display all the days in the week in the y axis */}
				<div className="calendar">
					<div className="days">
						{calendar.map(({ day }) => (
							<h3 key={day} className="subheader">
								{capitalize(day)}
							</h3>
						))}
					</div>

					{/* fill in the calendar */}
					<div className="icon-grid">
						{calendar.map(({ day, meals }) => (
							<ul key={day}>
								{mealOrder.map(mealType => (
									<li key={mealType} className="meal">
										{meals[mealType] ? (
											<div className="food-item">
												<img
													src={meals[mealType].image}
													alt={meals[mealType].label}
												/>
												<button
													onClick={() =>
														boundRemoveFromCalendar({ mealType, day })
													}
												>
													Clear
												</button>
											</div>
										) : (
											<button className="icon-btn">
												<CalendarIcon size={30} />
											</button>
										)}
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
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
const mapStateToProps = ({ calendar }) => ({
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
