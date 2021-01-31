import { authActionTypes as act } from '../actions/actionTypes'

const initialState = {
	signup: {},
	signed: false,
	verified: false
}

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case act.REGISTER_REQUEST:
			return { ...state, signup: action.payload.signup }
		case act.REGISTER_SUCCESS:
			return {
				signed: action.payload.signed,
				verified: action.payload.verified
			}
		case act.VERIFY_ACCOUNT_REQUEST:
			return { ...state, verificationToken: action.payload.verificationToken }
		case act.VERIFY_ACCOUNT_SUCCESS:
			return { ...state, verified: true }
		default:
			return state
	}
}
