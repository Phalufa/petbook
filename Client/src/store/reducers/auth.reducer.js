import { authActionTypes as act } from '../actions/actionTypes'
import { authentication as auth } from '../../services/helpers'

const initialState = {
	loggedIn: auth.getUser() ? true : false,
	user: auth.getUser() ? auth.getUser() : null
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case act.LOGIN_REQUEST:
			return { ...state, user: null }
		case act.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				user: action.payload.user
			}
		case act.LOGIN_FAILED:
			return {
				...state,
				loggedIn: false,
				user: null
			}
		case act.LOGOUT:
			return {}
		default:
			return state
	}
}
