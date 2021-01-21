import { options, API_URL } from '../helpers/options'

const getComment = async commentId => {
	try {
		const getCommentResponse = await fetch(
			`${API_URL}comments/${+commentId}`,
			options.advancedIncAuth('GET')
		)
		let data
		if (getCommentResponse.ok) data = await getCommentResponse.json()
		else data = await getCommentResponse.text()

		return data
	} catch (error) {
		return error
	}
}

const getAllPostComments = async postId => {
	try {
		const getPostCommentsResponse = await fetch(
			`${API_URL}comments/by-post/${+postId}`,
			options.advancedIncAuth('GET')
		)
		let data
		if (getPostCommentsResponse.ok) data = await getPostCommentsResponse.json()
		else data = await getPostCommentsResponse.text()

		return data
	} catch (error) {
		return error
	}
}

const getAllUserComments = async () => {
	try {
		const getUserCommentsResponse = await fetch(
			`${API_URL}comments`,
			options.advancedIncAuth('GET')
		)
		let data
		if (getUserCommentsResponse.ok) data = await getUserCommentsResponse.json()
		else data = await getUserCommentsResponse.text()

		return data
	} catch (error) {
		return error
	}
}

const createComment = async createCommentRequest => {
	try {
		const createCommentResponse = await fetch(
			`${API_URL}comments`,
			options.advancedIncAuthAndBody(
				'POST',
				JSON.stringify(createCommentRequest)
			)
		)
		let data
		if (createCommentResponse.ok) data = await createCommentResponse.json()
		else data = await createCommentResponse.text()

		return data
	} catch (error) {
		return error
	}
}

const updateComment = async (updateCommentRequest, commentId) => {
	try {
		const updateCommentResponse = await fetch(
			`${API_URL}comments/${+commentId}`,
			options.advancedIncAuthAndBody(
				'PATCH',
				JSON.stringify(updateCommentRequest)
			)
		)
		let data
		if (updateCommentResponse.ok) data = await updateCommentResponse.json()
		else data = await updateCommentResponse.text()

		return data
	} catch (error) {
		return error
	}
}

const deleteComment = async commentId => {
	try {
		const deleteCommentRequest = await fetch(
			`${API_URL}comments/${+commentId}`,
			options.advancedIncAuth('DELETE')
		)
		const data = await deleteCommentRequest.text()
		return data
	} catch (error) {
		return error
	}
}

export const commentService = {
	getComment,
	getAllPostComments,
	getAllUserComments,
	createComment,
	updateComment,
	deleteComment
}
