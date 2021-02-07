import { authActionTypes as ACTION } from './actionTypes'
import { authService } from '../../services'
import { request, success, fail } from '../helpers'

const login = (username, password) => {
	return dispatch => {
		dispatch(request(ACTION.LOGIN_REQUEST, {}))
		authService
			.login(username, password)
			.then(result => {
				if (result.startsWith('Invalid') || result.startsWith('Bad')) {
					dispatch(fail(ACTION.LOGIN_FAILED, { error: result }))
				} else {
					dispatch(
						success(ACTION.LOGIN_SUCCESS, {
							loggedIn: true,
							user: result
						})
					)
				}
			})
			.catch(err => {
				dispatch(fail(ACTION.LOGIN_FAILED, { error: err }))
			})
	}
}

const logout = () => {
	authService.logout()
	return { type: ACTION.LOGOUT }
}

const registerAccount = signupRequest => {
	return dispatch => {
		dispatch(request(ACTION.REGISTER_REQUEST, { signup: signupRequest }))
		authService.registerAccount(signupRequest).then(result => {
			if (result.startsWith('Thank'))
				dispatch(
					success(ACTION.REGISTER_SUCCESS, {
						signed: true,
						verified: false,
						message: result
					})
				)
			else dispatch(fail(ACTION.REGISTER_FAILED, { error: result }))
		})
	}
}

const verifyAccount = verificationToken => {
	return dispatch => {
		dispatch(request(ACTION.VERIFY_ACCOUNT_REQUEST, verificationToken))
		authService.verifyAccount(verificationToken).then(result => {
			if (result.startsWith('Your'))
				dispatch(
					success(ACTION.VERIFY_ACCOUNT_SUCCESS, {
						message: result,
						verified: true
					})
				)
			else {
				const err = 'Incorrect token'
				dispatch(fail(ACTION.VERIFY_ACCOUNT_FAILED, { error: err }))
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
