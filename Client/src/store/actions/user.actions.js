import { userActionTypes } from './actionTypes/index'
import { userService } from '../../services/index'
import { request, success, fail } from '../helpers/index'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../services/helpers/index'

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

const uploadImage = (dispatch, image, userId) => {
	userService.uploadUserImage(image, userId).then(result => {
		if (result.startsWith('Image'))
			dispatch(
				success(userActionTypes.UPLOAD_USER_PROFILE_IMAGE_SUCCESS, {
					message: result
				})
			)
		else
			dispatch(
				fail(userActionTypes.UPLOAD_USER_PROFILE_IMAGE_FAILED, {
					error: result
				})
			)
	})
}

const uploadUserImage = (image, userId) =>
	refreshTokenInterceptorIncBody(
		request(userActionTypes.UPLOAD_USER_PROFILE_IMAGE_REQUEST, {}),
		uploadImage,
		image,
		userId
	)

export const userActions = {
	getProfile,
	updateProfile,
	uploadUserImage
}
