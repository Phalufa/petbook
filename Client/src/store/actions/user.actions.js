import { userActionTypes } from './actionTypes/index'
import { userService } from '../../services/index'
import { request, success, fail } from '../../helpers/dispatchers'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../utils/interceptors'

const getUserDetails = dispatch => {
	userService.getUserDetails().then(result => {
		if (result)
			dispatch(
				success(userActionTypes.GET_USER_DETAILS_SUCCESS, {
					email: result.email,
					firstName: result.firstName,
					lastName: result.lastName,
					id: result.id,
					image: result.image
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(userActionTypes.GET_USER_DETAILS_FAILED, { error: err }))
		}
	})
}

const updateUserDetails = (dispatch, updateUserRequest) => {
	userService.updateUserDetails(updateUserRequest).then(result => {
		if (result instanceof Object)
			dispatch(
				success(userActionTypes.UPDATE_USER_DETAILS_SUCCESS, {
					email: result.email,
					firstName: result.firstName,
					lastName: result.lastName,
					id: result.id,
					image: result.image
				})
			)
		else {
			// const err = 'Unauthorized'
			dispatch(
				fail(userActionTypes.UPDATE_USER_DETAILS_FAILED, { error: result })
			)
		}
	})
}

const getProfile = () =>
	refreshTokenInterceptor(
		request(userActionTypes.GET_USER_DETAILS_REQUEST, {}),
		getUserDetails
	)

const updateProfile = updateUserRequest =>
	refreshTokenInterceptorIncBody(
		request(userActionTypes.UPDATE_USER_DETAILS_REQUEST, {}),
		updateUserDetails,
		updateUserRequest
	)

export const userActions = {
	getProfile,
	updateProfile
}
