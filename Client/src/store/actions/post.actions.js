import { request, success, fail } from '../../helpers/dispatchers'
import { postService } from '../../services/index'
import { postActionTypes } from './actionTypes'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../utils/interceptors'

const postPagination = (dispatch, postPage) => {
	postService.getPostPage(postPage).then(result => {
		if (result) {
			dispatch(
				success(postActionTypes.GET_POST_PAGE_SUCCESS, {
					posts: { all: result.content, user: [] },
					lastPage: result.last,
					pageNumber: result.pageable.pageNumber
				})
			)
		} else {
			const err = 'Unauthorized'
			dispatch(fail(postActionTypes.GET_POST_PAGE_FAILED, { error: err }))
		}
	})
}

const getPostPage = postPage =>
	refreshTokenInterceptorIncBody(
		request(postActionTypes.GET_POST_PAGE_REQUEST, {}),
		postPagination,
		postPage
	)

const getPosts = dispatch => {
	postService.getAllPosts().then(result => {
		if (result)
			dispatch(
				success(postActionTypes.GET_ALL_POSTS_SUCCESS, {
					posts: { all: result, user: [] }
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(postActionTypes.GET_ALL_POSTS_FAILED, { error: err }))
		}
	})
}

const getAllPosts = () =>
	refreshTokenInterceptor(
		request(postActionTypes.GET_ALL_POSTS_REQUEST, {}),
		getPosts
	)

const getPost = id => {}

const getUserPosts = (dispatch, username) => {
	postService.getPostsByUser(username).then(result => {
		if (result) {
			dispatch(
				success(postActionTypes.GET_USER_POSTS_SUCCESS, {
					posts: { user: result, all: [] }
				})
			)
		} else {
			const err = 'Unauthorized'
			dispatch(fail(postActionTypes.GET_USER_POSTS_FAILED, { error: err }))
		}
	})
}

const getPostsByUser = username =>
	refreshTokenInterceptorIncBody(
		request(postActionTypes.GET_USER_POSTS_REQUEST, {}),
		getUserPosts,
		username
	)

const createNewPost = (dispatch, postRequest) => {
	postService.createPost(postRequest).then(result => {
		if (result)
			dispatch(
				success(postActionTypes.CREATE_POST_SUCCESS, {
					newPost: result
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(postActionTypes.CREATE_POST_FAILED, { error: err }))
		}
	})
}

const createPost = postRequest =>
	refreshTokenInterceptorIncBody(
		request(postActionTypes.CREATE_POST_REQUEST, {}),
		createNewPost,
		postRequest
	)

const updateUserPost = (dispatch, postRequest, postId) => {
	postService.updatePost(postRequest, postId).then(result => {
		if (result)
			dispatch(
				success(postActionTypes.UPDATE_POST_SUCCESS, {
					message: 'Post has been edited successfully',
					updatedPost: result
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(postActionTypes.UPDATE_POST_FAILED, { error: err }))
		}
	})
}

const updatePost = (postRequest, postId) =>
	refreshTokenInterceptorIncBody(
		request(postActionTypes.UPDATE_POST_REQUEST, {}),
		updateUserPost,
		postRequest,
		postId
	)

const deleteUserPost = (dispatch, postId) => {
	postService.deletePost(postId).then(result => {
		if (result.startsWith('Post'))
			dispatch(
				success(postActionTypes.DELETE_POST_SUCCESS, {
					message: result,
					deletedPostId: postId
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(postActionTypes.DELETE_POST_FAILED, { error: err }))
		}
	})
}

const deletePost = id =>
	refreshTokenInterceptorIncBody(
		request(postActionTypes.DELETE_POST_REQUEST, {}),
		deleteUserPost,
		id
	)

const clearPosts = () => {
	return dispatch => dispatch({ type: postActionTypes.CLEAR_POSTS })
}

export const postActions = {
	getPostPage,
	getPost,
	getAllPosts,
	getPostsByUser,
	createPost,
	updatePost,
	deletePost,
	clearPosts
}
