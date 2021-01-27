import * as types from './index'

/**
 * Returns a new object consist of the given state condition
 * @param {*} actionTypes the actionTypes to extract from
 * @param {*} stateCondition REQUEST, SUCCESS OR FAILED
 */
const extractTypes = (actionTypes, stateCondition) => {
	let obj = {}
	for (const a of Object.values(actionTypes)) {
		for (const [k, v] of Object.entries(a)) {
			if (v.includes(stateCondition)) obj[k] = a[k]
		}
	}
	return obj
}

export const requestActionTypes = extractTypes(types, 'REQUEST')
export const successActionTypes = extractTypes(types, 'SUCCESS')
export const failedActionTypes = extractTypes(types, 'FAILED')
