import { options, API_URL, authentication as auth } from './helpers'

const getUserDetails = async () => {
	try {
		const userDetails = await fetch(
			`${API_URL}user`,
			options.advancedIncAuth('GET')
		)
		const data = await userDetails.json()
		return data
	} catch (error) {
		return error
	}
}

const getOtherUserDetails = async username => {
	try {
		const otherUserDetails = await fetch(
			`${API_URL}user/${username}`,
			options.advancedIncAuth('GET')
		)
		const data = await otherUserDetails.json()
		return data
	} catch (error) {
		return error
	}
}

const updateUserDetails = async updateUserRequest => {
	try {
		const updateUserResponse = await fetch(
			`${API_URL}user`,
			options.advancedIncAuthAndBody('PUT', JSON.stringify(updateUserRequest))
		)
		let data
		if (updateUserResponse.ok) data = await updateUserResponse.json()
		// error
		else data = await updateUserResponse.text()

		return data
	} catch (error) {
		return error
	}
}

const uploadUserImage = async (image, userId) => {
	const formData = new FormData()
	formData.append('image', image)
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${auth.getJwt()}`
		},
		body: formData
	}
	try {
		const imageUploadResponse = await fetch(
			`${API_URL}user/${userId}/image/upload`,
			options
		)
		const response = await imageUploadResponse.text()
		return response
	} catch (error) {
		return error
	}
}

const downloadUserImage = userId => {
	return `${API_URL}user/${userId}/image/download`
}

const getUserProfileImage = username => {
	return `${API_URL}user/image/profile/${username}/download`
}

export const userService = {
	getUserDetails,
	updateUserDetails,
	uploadUserImage,
	downloadUserImage,
	getUserProfileImage,
	getOtherUserDetails
}
