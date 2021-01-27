import { authentication as auth } from './authentication'
import { authService } from '../index'

export const refreshTokenInterceptor = (dispatchType, request) => {
	return dispatch => {
		dispatch(dispatchType)
		if (auth.isJwtExpired())
			authService.refreshToken().then(next => request(dispatch))
		else request(dispatch)
	}
}

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
