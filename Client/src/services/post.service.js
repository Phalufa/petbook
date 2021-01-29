import { options, API_URL } from './helpers'

// Pagination
const getPostPage = async postPage => {
	try {
		const response = await fetch(
			`${API_URL}posts/page`,
			options.advancedIncAuthAndBody('POST', JSON.stringify(postPage))
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}

const getPost = async id => {
	try {
		const response = await fetch(
			`${API_URL}posts/${id}`,
			options.advancedIncAuth('GET')
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}

const getAllPosts = async () => {
	try {
		const response = await fetch(
			`${API_URL}posts`,
			options.advancedIncAuth('GET')
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}

const getPostsByUser = async username => {
	try {
		const response = await fetch(
			`${API_URL}posts/by-user/${username}`,
			options.advancedIncAuth('GET')
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}

const createPost = async postRequest => {
	try {
		const response = await fetch(
			`${API_URL}posts`,
			options.advancedIncAuthAndBody('POST', JSON.stringify(postRequest))
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}

const deletePost = async id => {
	try {
		const response = await fetch(
			`${API_URL}posts/${+id}`,
			options.advancedIncAuth('DELETE')
		)
		const data = await response.text()
		return data
	} catch (error) {
		return error
	}
}

const updatePost = async (postRequest, id) => {
	try {
		const response = await fetch(
			`${API_URL}posts/${id}`,
			options.advancedIncAuthAndBody('PATCH', JSON.stringify(postRequest))
		)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}

export const postService = {
	getPostPage,
	getPost,
	getAllPosts,
	getPostsByUser,
	createPost,
	updatePost,
	deletePost
}
