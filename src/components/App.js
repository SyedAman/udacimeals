import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';

class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello World!</h1>
			</div>
		);
	}
}

const mapStateToProps = calendar => {
	const days = [
		'sunday',
		'monday',
		'tuesday',
		'thursday',
		'friday',
		'saturday',
	];

	return {
		calender: days.map(day => ({
			day,
			meals: Object.keys(calendar[day]).reduce((meals, meal) => ({
				...meals,
				[meal]: calendar[day][meal],
			})),
		})),
	};
};

export default connect(mapStateToProps)(App);
