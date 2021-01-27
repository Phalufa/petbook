import { authActionTypes } from '../actions/actionTypes/index'
import { authentication as auth } from '../../helpers/authentication'

const initialState = {
	loggedIn: auth.getUser() ? true : false,
	user: auth.getUser() ? auth.getUser() : null
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authActionTypes.LOGIN_REQUEST:
			return { ...state, user: null }
		case authActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				user: action.payload.user
			}
		case authActionTypes.LOGIN_FAILED:
			return {
				...state,
				loggedIn: false,
				user: null
			}
		case authActionTypes.LOGOUT:
			return {}
		default:
			return state
	}
}
