import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';

class App extends Component {
	render() {
		return (
			<div>
				<h1>Learning Redux!</h1>
			</div>
		);
	}
}

const mapStateToProps = calendar => ({
	calendar: Object.keys(calendar).map(day => ({ day, meals: calendar[day] })),
});

export default connect(mapStateToProps)(App);
