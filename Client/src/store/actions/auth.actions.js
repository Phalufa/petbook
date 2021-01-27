import { authActionTypes } from './actionTypes/index'
import { authService } from '../../services/index'
import { request, success, fail } from '../helpers/index'

const login = (username, password) => {
	return dispatch => {
		dispatch(request(authActionTypes.LOGIN_REQUEST, {}))
		authService
			.login(username, password)
			.then(result => {
				if (result.startsWith('Invalid') || result.startsWith('Bad')) {
					dispatch(fail(authActionTypes.LOGIN_FAILED, { error: result }))
				} else {
					dispatch(
						success(authActionTypes.LOGIN_SUCCESS, {
							loggedIn: true,
							user: result
						})
					)
				}
			})
			.catch(err => {
				dispatch(fail(authActionTypes.LOGIN_FAILED, { error: err }))
			})
	}
}

const logout = () => {
	authService.logout()
	return { type: authActionTypes.LOGOUT }
}

const registerAccount = signupRequest => {
	return dispatch => {
		dispatch(
			request(authActionTypes.REGISTER_REQUEST, { signup: signupRequest })
		)
		authService.registerAccount(signupRequest).then(result => {
			if (result.startsWith('Thank'))
				dispatch(
					success(authActionTypes.REGISTER_SUCCESS, {
						signed: true,
						verified: false,
						message: result
					})
				)
			else dispatch(fail(authActionTypes.REGISTER_FAILED, { error: result }))
		})
	}
}

const verifyAccount = verificationToken => {
	return dispatch => {
		dispatch(request(authActionTypes.VERIFY_ACCOUNT_REQUEST, verificationToken))
		authService.verifyAccount(verificationToken).then(result => {
			if (result.startsWith('Your'))
				dispatch(
					success(authActionTypes.VERIFY_ACCOUNT_SUCCESS, {
						message: result,
						verified: true
					})
				)
			else {
				const err = 'Incorrect token'
				dispatch(fail(authActionTypes.VERIFY_ACCOUNT_FAILED, { error: err }))
			}
		})
	}
}

export const authActions = {
	login,
	logout,
	registerAccount,
	verifyAccount
}
