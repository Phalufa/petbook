import { authActionTypes as ACTION } from '../actions/actionTypes'
import { authentication as auth } from '../../services/helpers'

const initialState = {
	loggedIn: auth.getUser() ? true : false,
	user: auth.getUser() ? auth.getUser() : null
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION.LOGIN_REQUEST:
			return { ...state, user: null }
		case ACTION.LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				user: action.payload.user
			}
		case ACTION.LOGIN_FAILED:
			return {
				...state,
				loggedIn: false,
				user: null
			}
		case ACTION.LOGOUT:
			return {}
		default:
			return state
	}
}
