import { authActionTypes } from '../actions/actionTypes/index'
import { authentication as auth } from '../../helpers/authentication'

const initialState = {
	loggedIn: auth.getUser() ? true : false,
	user: auth.getUser() ? auth.getUser() : null,
	error: null
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authActionTypes.LOGIN_REQUEST:
			return { ...state, request: true, error: null, user: null }
		case authActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				user: action.payload.user,
				request: false,
				error: null
			}
		case authActionTypes.LOGIN_FAILED:
			return {
				...state,
				loggedIn: false,
				...action.error,
				request: false,
				user: null
			}
		case authActionTypes.LOGOUT:
			return {}
		default:
			return state
	}
}
