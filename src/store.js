import { createStore } from 'redux';

import reducer from './reducers';

/**
 * The application state made using Redux.
 * @type {object}
 */
const store = createStore(
	reducer,
	// integrate store with Redux Dev Tools
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
