import React, { Component } from 'react';

import { addRecipe } from '../actions';
import '../App.css';

class App extends Component {
	/**
	 * The component's state.
	 * @type {Object}
	 */
	state = {
		calendar: null,
	};

	componentDidMount() {
		/**
		 * The redux store.
		 * @type {Object}
		 */
		const { store } = this.props;

		// listen for store updates
		store.subscribe(() => {
			// update calendar with new changes
			this.setState({
				calendar: store.getState(),
			});
		});
	}

	/**
	 * Updates the calendar with meals for the day.
	 * @method submitFood
	 * @return {Void}
	 */
	submitFood = () => {
		this.props.store.dispatch(
			addRecipe({
				recipe: {
					label: this.input.value,
				},
				day: 'monday',
				meal: 'breakfast',
			}),
		);

		this.input.value = '';
	};

	render() {
		return (
			<div>
				{/* Field & button that updates monday's breakfast. */}
				<input
					type="text"
					ref={input => (this.input = input)}
					placeholder="Monday's Breakfast"
				/>
				<button onClick={this.submitFood}>Submit</button>

				{/* Display monday's breakfast. */}
				<pre>
					{`Monday's Breakfast: ${this.state.calendar &&
						this.state.calendar.monday.breakfast}`}
				</pre>
			</div>
		);
	}
}

export default App;
