import { authActionTypes as ACTION } from '../actions/actionTypes'

const initialState = {
	signup: {},
	signed: false,
	verified: false
}

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION.REGISTER_REQUEST:
			return { ...state, signup: action.payload.signup }
		case ACTION.REGISTER_SUCCESS:
			return {
				signed: action.payload.signed,
				verified: action.payload.verified
			}
		case ACTION.VERIFY_ACCOUNT_REQUEST:
			return { ...state, verificationToken: action.payload.verificationToken }
		case ACTION.VERIFY_ACCOUNT_SUCCESS:
			return { ...state, verified: true }
		default:
			return state
	}
}
