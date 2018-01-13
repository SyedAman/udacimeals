import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import reducer from './reducers';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

/**
 * The application state made using Redux.
 * @type {object}
 */
const store = createStore(
	reducer,
	// integrate store with Redux Dev Tools
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
