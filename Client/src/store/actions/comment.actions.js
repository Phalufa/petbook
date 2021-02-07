import { request, success, fail } from '../helpers'
import { commentService } from '../../services'
import { commentActionTypes as ACTION } from './actionTypes'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../services/helpers'

const commentPagination = (dispatch, postId, commentPage) => {
	const page = commentPage[0]
	commentService.getCommentPage(postId, page).then(result => {
		if (result) {
			dispatch(
				success(ACTION.GET_COMMENT_PAGE_SUCCESS, {
					comments: result.content,
					lastPage: result.last,
					pageNumber: result.pageable.pageNumber
				})
			)
		} else {
			const err = 'Unauthorized'
			dispatch(fail(ACTION.GET_COMMENT_PAGE_FAILED, { error: err }))
		}
	})
}

const getCommentPage = (postId, commentPage) =>
	refreshTokenInterceptorIncBody(
		request(ACTION.GET_COMMENT_PAGE_REQUEST, {}),
		commentPagination,
		postId,
		commentPage
	)

const getAComment = (dispatch, commentId) => {
	commentService.getComment(commentId).then(result => {
		if (result instanceof Object)
			dispatch(
				success(ACTION.GET_COMMENT_SUCCESS, {
					comment: result
				})
			)
		else
			dispatch(
				fail(ACTION.GET_COMMENT_FAILED, {
					error: result
				})
			)
	})
}

const getComment = () =>
	refreshTokenInterceptor(
		request(ACTION.GET_COMMENT_REQUEST, {}),
		getAComment
	)

const createAComment = (dispatch, commentRequest) => {
	commentService.createComment(commentRequest).then(result => {
		if (result instanceof Object)
			dispatch(
				success(ACTION.CREATE_COMMENT_SUCCESS, { comment: result })
			)
		else
			dispatch(
				fail(ACTION.CREATE_COMMENT_FAILED, { error: result })
			)
	})
}

const createComment = commentRequest =>
	refreshTokenInterceptorIncBody(
		request(ACTION.CREATE_COMMENT_REQUEST, {}),
		createAComment,
		commentRequest
	)

const getCommentsOfPost = (dispatch, postId) => {
	commentService.getAllPostComments(postId).then(result => {
		if (Array.isArray(result))
			dispatch(
				success(ACTION.GET_ALL_POST_COMMENTS_SUCCESS, {
					comments: result
				})
			)
		else
			dispatch(
				fail(ACTION.GET_ALL_POST_COMMENTS_FAILED, { error: result })
			)
	})
}

const getPostComments = postId =>
	refreshTokenInterceptorIncBody(
		request(ACTION.GET_ALL_POST_COMMENTS_REQUEST, {}),
		getCommentsOfPost,
		postId
	)

const getUserComments = dispatch => {
	commentService.getAllUserComments().then(result => {
		if (Array.isArray(result))
			dispatch(
				success(ACTION.GET_USER_COMMENTS_SUCCESS, {
					comments: result
				})
			)
		else
			dispatch(
				fail(ACTION.GET_USER_COMMENTS_FAILED, { error: result })
			)
	})
}

const getAllUserComments = () =>
	refreshTokenInterceptor(
		request(ACTION.GET_USER_COMMENTS_REQUEST, {}),
		getUserComments
	)

const updateAComment = (dispatch, commentRequest, commentId) => {
	commentService.updateComment(commentRequest, commentId).then(result => {
		if (result instanceof Object)
			dispatch(
				success(ACTION.UPDATE_COMMENT_SUCCESS, { comment: result })
			)
		else
			dispatch(
				fail(ACTION.UPDATE_COMMENT_FAILED, { error: result })
			)
	})
}

const updateComment = (commentRequest, commentId) =>
	refreshTokenInterceptorIncBody(
		request(ACTION.UPDATE_COMMENT_REQUEST, {}),
		updateAComment,
		commentRequest,
		commentId
	)

const deleteAComment = (dispatch, commentId, postId) => {
	commentService.deleteComment(commentId).then(result => {
		if (result.startsWith('Comment'))
			dispatch(
				success(ACTION.DELETE_COMMENT_SUCCESS, {
					message: result,
					commentId,
					postId
				})
			)
		else
			dispatch(
				fail(ACTION.DELETE_COMMENT_FAILED, { error: result })
			)
	})
}

const deleteComment = (commentId, postId) =>
	refreshTokenInterceptorIncBody(
		request(ACTION.DELETE_COMMENT_REQUEST, {}),
		deleteAComment,
		commentId,
		postId
	)

	const clearComments = () => {
		return dispatch => dispatch({ type: ACTION.CLEAR_COMMENTS })
	}

export const commentActions = {
	getCommentPage,
	getComment,
	updateComment,
	deleteComment,
	getAllUserComments,
	createComment,
	getPostComments,
	clearComments
}
