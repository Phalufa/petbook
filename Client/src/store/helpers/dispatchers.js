export const request = (actionType, payload) => {
	return { type: actionType, payload }
}

export const success = (actionType, payload) => {
	return { type: actionType, payload }
}

export const fail = (actionType, error) => {
	return { type: actionType, error }
}
