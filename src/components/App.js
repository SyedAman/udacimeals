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

export default connect()(App);
