import { userActionTypes as ACTION } from './actionTypes'
import { userService } from '../../services'
import { request, success, fail } from '../helpers'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../services/helpers'

const getUserDetails = dispatch => {
	userService.getUserDetails().then(result => {
		if (result)
			dispatch(
				success(ACTION.GET_USER_DETAILS_SUCCESS, {
					email: result.email,
					firstName: result.firstName,
					lastName: result.lastName,
					id: result.id,
					image: result.image
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.GET_USER_DETAILS_FAILED, { error: err }))
		}
	})
}

const updateUserDetails = (dispatch, updateUserRequest) => {
	userService.updateUserDetails(updateUserRequest).then(result => {
		if (result instanceof Object)
			dispatch(
				success(ACTION.UPDATE_USER_DETAILS_SUCCESS, {
					email: result.email,
					firstName: result.firstName,
					lastName: result.lastName,
					id: result.id,
					image: result.image
				})
			)
		else {
			// const err = 'Unauthorized'
			dispatch(fail(ACTION.UPDATE_USER_DETAILS_FAILED, { error: result }))
		}
	})
}

const getProfile = () =>
	refreshTokenInterceptor(
		request(ACTION.GET_USER_DETAILS_REQUEST, {}),
		getUserDetails
	)

const updateProfile = updateUserRequest =>
	refreshTokenInterceptorIncBody(
		request(ACTION.UPDATE_USER_DETAILS_REQUEST, {}),
		updateUserDetails,
		updateUserRequest
	)

const uploadImage = (dispatch, image, userId) => {
	userService.uploadUserImage(image, userId).then(result => {
		if (result.startsWith('Image'))
			dispatch(
				success(ACTION.UPLOAD_USER_PROFILE_IMAGE_SUCCESS, {
					message: result
				})
			)
		else
			dispatch(
				fail(ACTION.UPLOAD_USER_PROFILE_IMAGE_FAILED, {
					error: result
				})
			)
	})
}

const uploadUserImage = (image, userId) =>
	refreshTokenInterceptorIncBody(
		request(ACTION.UPLOAD_USER_PROFILE_IMAGE_REQUEST, {}),
		uploadImage,
		image,
		userId
	)

export const userActions = {
	getProfile,
	updateProfile,
	uploadUserImage
}
