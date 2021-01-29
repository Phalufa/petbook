import { userActionTypes } from '../actions/actionTypes'
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
		case userActionTypes.GET_USER_DETAILS_REQUEST:
			return { ...state }
		case userActionTypes.GET_USER_DETAILS_SUCCESS:
			return {
				...state,
				username: auth.getUser(),
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				email: action.payload.email,
				id: action.payload.id,
				image: action.payload.image
			}
		case userActionTypes.GET_USER_DETAILS_FAILED:
			return { ...state }
		case userActionTypes.UPDATE_USER_DETAILS_REQUEST:
			return { ...state }
		case userActionTypes.UPDATE_USER_DETAILS_SUCCESS:
			return {
				...state,
				username: auth.getUser(),
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				email: action.payload.email,
				id: action.payload.id,
				image: action.payload.image
			}
		case userActionTypes.UPDATE_USER_DETAILS_FAILED:
			return { ...state }
		case userActionTypes.UPLOAD_USER_PROFILE_IMAGE_REQUEST:
			return { ...state }
		case userActionTypes.UPLOAD_USER_PROFILE_IMAGE_SUCCESS:
			return { ...state }
		case userActionTypes.UPLOAD_USER_PROFILE_IMAGE_FAILED:
			return { ...state }
		default:
			return state
	}
}
