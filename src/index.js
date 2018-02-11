import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const actionLoggerMiddleware = store => next => action => {
	console.group(action.type);
	console.log('dispatching', action);

	const result = next(action);

	console.log('next state', store.getState());
	console.groupEnd(action.type);

	return result;
};

const composeEnhancersWithReduxDevTools =
	window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

/**
 * The application state made using Redux.
 * @type {object}
 */
const store = createStore(
	rootReducer,
	// integrate store with Redux Dev Tools
	composeEnhancersWithReduxDevTools(applyMiddleware(actionLoggerMiddleware)),
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
registerServiceWorker();
