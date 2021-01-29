import { authActionTypes } from '../actions/actionTypes'

const initialState = {
	signup: {},
	signed: false,
	verified: false
}

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case authActionTypes.REGISTER_REQUEST:
			return { ...state, signup: action.payload.signup }
		case authActionTypes.REGISTER_SUCCESS:
			return {
				signed: action.payload.signed,
				verified: action.payload.verified
			}
		case authActionTypes.REGISTER_FAILED:
			return { ...state }
		case authActionTypes.VERIFY_ACCOUNT_REQUEST:
			return { ...state, verificationToken: action.payload.verificationToken }
		case authActionTypes.VERIFY_ACCOUNT_SUCCESS:
			return { ...state, verified: true }
		case authActionTypes.VERIFY_ACCOUNT_FAILED:
			return { ...state }
		default:
			return state
	}
}
