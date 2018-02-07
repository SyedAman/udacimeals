import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import Modal from 'react-modal';
import Loading from 'react-loading';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';

import { addRecipe, removeFromCalender } from '../actions';
import FoodList from './FoodList';
import { capitalize } from '../utils/helpers';
import '../App.css';
import { fetchRecipes } from '../utils/api';

class App extends Component {
	/**
	 * Local state.
	 * @type {Object}
	 */
	state = {
		/**
		 * Whether calls to the API is in progress.
		 * @type {Boolean}
		 */
		isLoading: false,
		/**
		 * Whether the modal to update meals is open or not.
		 * @type {Boolean}
		 */
		isModalOpen: false,
		/**
		 * Breakfast, lunch, or dinner.
		 * @type {String}
		 */
		mealType: null,
		/**
		 * Any day of the week. Monday - Sunday.
		 * @type {String}
		 */
		day: null,
		/**
		 * Any kind of recipe.
		 * @type {String}
		 */
		food: null,
	};

	/**
	 * Opens the modal to edit meals for a day.
	 * @method openModal
	 * @param  {Object} mealType - The meal (breakfast, lunch, or dinner) to update.
	 * @param  {Object} day - The day of the week to update the meal for.
	 * @return {Undefined}
	 */
	openModal = ({ mealType, day }) => {
		this.setState(() => ({ isModalOpen: true, mealType, day }));
	};

	/**
	 * Closes the modal for editing meals for a day.
	 * @method closeModal
	 * @return {Undefined}
	 */
	closeModal = () => {
		this.setState(() => ({
			isModalOpen: false,
			mealType: null,
			day: null,
			recipeSearchResults: null,
		}));
	};

	/**
	 * Searches for the queried food using the edamam api.
	 * @method searchForFood
	 * @param  {Object} event - Native DOM event.
	 * @return {Undefined}
	 */
	searchForFood = async event => {
		// don't search if user hasn't typed anything
		if (!this.input.value) return;

		event.preventDefault();

		try {
			this.setState(() => ({ isLoading: true }));

			// search the food using the edamam api
			const recipeSearchResults = await fetchRecipes(this.input.value);
			this.setState(() => ({ recipeSearchResults, isLoading: false }));
		} catch (error) {
			throw new Error('failed to search for food!', error);
		}
	};

	render() {
		const { isModalOpen, isLoading, recipeSearchResults } = this.state;
		const { calendar, boundAddRecipe, boundRemoveFromCalendar } = this.props;
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
												{/* Shows a picture of the meal for the day. */}
												<img
													src={meals[mealType].image}
													alt={meals[mealType].label}
												/>
												{/* Removes the meal from the day. */}
												<button
													onClick={() =>
														boundRemoveFromCalendar({ mealType, day })
													}
												>
													Clear
												</button>
											</div>
										) : (
											// opens the modal to add in a meal
											// indicate no meal
											<button
												onClick={() => this.openModal({ mealType, day })}
												className="icon-btn"
											>
												<CalendarIcon size={30} />
											</button>
										)}
									</li>
								))}
							</ul>
						))}
					</div>
				</div>

				{/* the modal for updating meals fo the day. */}
				<Modal
					className="modal"
					overlayClassName="overlay"
					isOpen={isModalOpen}
					onRequestClose={this.closeModal}
					contentLabel="Modal"
				>
					<div>
						{isLoading ? (
							// Display spinner when making async calls to the Edamam API.
							<Loading
								delay={200}
								type="spin"
								color="#4fd65d"
								className="loading"
							/>
						) : (
							// Display the main form/input/content of the modal.
							<div className="search-container">
								{/* Header. */}
								<h3 className="subheader">
									Find a meal for {capitalize(this.state.day)}{' '}
									{this.state.mealType}
								</h3>

								{/* Search bar. */}
								<div className="search">
									<input
										className="food-input"
										type="text"
										placeholder="Search Foods"
										ref={input => (this.input = input)}
									/>
									{/* Button that initiates searching. */}
									<button onClick={this.searchForFood} className="icon-btn">
										<ArrowRightIcon size={30} />
									</button>

									{/* Display food from search results. */}
									{recipeSearchResults && (
										<FoodList
											food={recipeSearchResults}
											onSelect={recipe => {
												// add the recipe to the calendar
												boundAddRecipe({
													recipe,
													day: this.state.day,
													meal: this.state.mealType,
												});

												// close the modal after selecting a recipe to add to
												// the day
												this.closeModal();
											}}
										/>
									)}
								</div>
							</div>
						)}
					</div>
				</Modal>
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
