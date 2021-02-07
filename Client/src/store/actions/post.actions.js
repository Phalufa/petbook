import { request, success, fail } from '../helpers'
import { postService } from '../../services'
import { postActionTypes as ACTION } from './actionTypes'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../services/helpers'

const postPagination = (dispatch, postPage) => {
	postService.getPostPage(postPage).then(result => {
		if (result) {
			Promise.all([
				dispatch(
					success(ACTION.GET_POST_PAGE_SUCCESS, {
						posts: { all: result.content, user: [] },
						lastPage: result.last,
						pageNumber: result.pageable.pageNumber
					})
				),
				dispatch(addPostToCommentReducer(result.content))
			])
		} else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.GET_POST_PAGE_FAILED, { error: err }))
		}
	})
}

const addPostToCommentReducer = posts => {
	return { type: ACTION.ADD_POST_ID_TO_COMMENTS, payload: posts }
}

const getPostPage = postPage =>
	refreshTokenInterceptorIncBody(
		request(ACTION.GET_POST_PAGE_REQUEST, {}),
		postPagination,
		postPage
	)

const getPosts = dispatch => {
	postService.getAllPosts().then(result => {
		if (result)
			dispatch(
				success(ACTION.GET_ALL_POSTS_SUCCESS, {
					posts: { all: result, user: [] }
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.GET_ALL_POSTS_FAILED, { error: err }))
		}
	})
}

const getAllPosts = () =>
	refreshTokenInterceptor(request(ACTION.GET_ALL_POSTS_REQUEST, {}), getPosts)

const getPost = id => {}

const getUserPosts = (dispatch, username) => {
	postService.getPostsByUser(username).then(result => {
		if (result) {
			dispatch(
				success(ACTION.GET_USER_POSTS_SUCCESS, {
					posts: { user: result, all: [] }
				})
			)
		} else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.GET_USER_POSTS_FAILED, { error: err }))
		}
	})
}

const getPostsByUser = username =>
	refreshTokenInterceptorIncBody(
		request(ACTION.GET_USER_POSTS_REQUEST, {}),
		getUserPosts,
		username
	)

const createNewPost = (dispatch, postRequest) => {
	postService.createPost(postRequest).then(result => {
		if (result)
			Promise.all([
				dispatch(
					success(ACTION.CREATE_POST_SUCCESS, {
						newPost: result
					})
				),
				dispatch(addPostToCommentReducer([result]))
			])
		else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.CREATE_POST_FAILED, { error: err }))
		}
	})
}

const createPost = postRequest =>
	refreshTokenInterceptorIncBody(
		request(ACTION.CREATE_POST_REQUEST, {}),
		createNewPost,
		postRequest
	)

const updateUserPost = (dispatch, postRequest, postId) => {
	postService.updatePost(postRequest, postId).then(result => {
		if (result)
			dispatch(
				success(ACTION.UPDATE_POST_SUCCESS, {
					message: 'Post has been edited successfully',
					updatedPost: result
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.UPDATE_POST_FAILED, { error: err }))
		}
	})
}

const updatePost = (postRequest, postId) =>
	refreshTokenInterceptorIncBody(
		request(ACTION.UPDATE_POST_REQUEST, {}),
		updateUserPost,
		postRequest,
		postId
	)

const deleteUserPost = (dispatch, postId) => {
	postService.deletePost(postId).then(result => {
		if (result.startsWith('Post'))
			dispatch(
				success(ACTION.DELETE_POST_SUCCESS, {
					message: result,
					deletedPostId: postId
				})
			)
		else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.DELETE_POST_FAILED, { error: err }))
		}
	})
}

const deletePost = id =>
	refreshTokenInterceptorIncBody(
		request(ACTION.DELETE_POST_REQUEST, {}),
		deleteUserPost,
		id
	)

const clearPosts = () => {
	return dispatch => dispatch({ type: ACTION.CLEAR_POSTS })
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
