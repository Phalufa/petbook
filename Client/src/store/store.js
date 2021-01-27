import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as Reducers from './reducers/index'

const rootReducer = combineReducers({
	auth: Reducers.authReducer,
	register: Reducers.registerReducer,
	posts: Reducers.postReducer,
	user: Reducers.userReducer,
	comments: Reducers.commentReducer,
	requests: Reducers.requestReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))

export const store = createStore(rootReducer, enhancer)
