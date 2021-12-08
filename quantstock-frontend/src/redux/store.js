import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducers from './reducers';
import thunk from "redux-thunk"

const store = createStore(
    allReducers,
    {},
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
    )
);

export default store;