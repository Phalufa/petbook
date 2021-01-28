import { authentication as auth } from './authentication'
import { authService } from '../index'

/**
 * Refreshes the user's token before executing a function if needed.
 * Does not include a request body
 * @param {*} dispatchType the action type to dispatch
 * @param {*} request the function to use
 */
export const refreshTokenInterceptor = (dispatchType, request) => {
	return dispatch => {
		dispatch(dispatchType)
		if (auth.isJwtExpired())
			authService.refreshToken().then(next => request(dispatch))
		else request(dispatch)
	}
}

/**
 * Refreshes the user's token before executing a function if needed.
 * Includes a request body
 * @param {*} dispatchType the action type to dispatch
 * @param {*} request the function to use
 * @param {*} requestBody the request body to pass to the function
 * @param  {...any} args additional request body (optional)
 */
export const refreshTokenInterceptorIncBody = (
	dispatchType,
	request,
	requestBody,
	...args
) => {
	return dispatch => {
		dispatch(dispatchType)
		if (auth.isJwtExpired())
			authService
				.refreshToken()
				.then(next => request(dispatch, requestBody, args))
		else request(dispatch, requestBody, args)
	}
}
