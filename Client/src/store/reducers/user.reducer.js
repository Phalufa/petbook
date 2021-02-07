import { userActionTypes as ACTION } from '../actions/actionTypes'
import { authentication as auth } from '../../services/helpers'

const initialState = {
	username: auth.getUser() ? auth.getUser() : null,
	firstName: null,
	lastName: null,
	id: null,
	email: null,
	image: null
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION.GET_USER_DETAILS_SUCCESS: {
			let { firstName, lastName, email, id, image } = action.payload
			return {
				...state,
				username: auth.getUser(),
				firstName,
				lastName,
				email,
				id,
				image
			}
		}
		case ACTION.UPDATE_USER_DETAILS_SUCCESS: {
			let { firstName, lastName, email, id, image } = action.payload
			return {
				...state,
				username: auth.getUser(),
				firstName,
				lastName,
				email,
				id,
				image
			}
		}
		case ACTION.UPLOAD_USER_PROFILE_IMAGE_SUCCESS:
			return { ...state }
		default:
			return state
	}
}
