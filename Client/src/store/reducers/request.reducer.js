import {
	requestActionTypes,
	successActionTypes,
	failedActionTypes
} from '../actions/actionTypes/index'

const initialState = {
	request: null,
	message: null,
	error: null,
	loading: false
}

export const requestReducer = (state = initialState, action) => {
	if (isState(requestActionTypes, action)) {
		return {
			request: action.type,
			loading: true
		}
	} else if (isState(successActionTypes, action)) {
		return {
			request: null,
			message: action.payload.message,
			loading: false
		}
	} else if (isState(failedActionTypes, action)) {
		return {
			request: null,
			loading: false,
			error: action.error.error
		}
	}

	switch (action.type) {
		case 'CLEAR_ERROR':
			return { ...state, error: null }
		case 'CLEAR_MESSAGE':
			return { ...state, message: null }
		default:
			return state
	}
}

/**
 * Returns true if the action type matches the type
 * @param {*} actionType the action's type
 * @param {*} type the type to match: REQUEST, SUCCESS, FAILED
 */
const isState = (actionTypes, action) => {
	for (const k of Object.keys(actionTypes)) {
		if (actionTypes[k] === action.type) return true
	}
	return false
}
