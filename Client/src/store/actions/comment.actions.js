import { request, success, fail } from '../helpers/index'
import { commentService } from '../../services/index'
import { commentActionTypes } from './actionTypes'
import {
	refreshTokenInterceptor,
	refreshTokenInterceptorIncBody
} from '../../services/helpers/index'

const getAComment = (dispatch, commentId) => {
	commentService.getComment(commentId).then(result => {
		if (result instanceof Object)
			dispatch(
				success(commentActionTypes.GET_COMMENT_SUCCESS, {
					comment: result
				})
			)
		else
			dispatch(
				fail(commentActionTypes.GET_COMMENT_FAILED, {
					error: result
				})
			)
	})
}

const getComment = () =>
	refreshTokenInterceptor(
		request(commentActionTypes.GET_COMMENT_REQUEST, {}),
		getAComment
	)

const createAComment = (dispatch, commentRequest) => {
	commentService.createComment(commentRequest).then(result => {
		if (result instanceof Object)
			dispatch(
				success(commentActionTypes.CREATE_COMMENT_SUCCESS, { comment: result })
			)
		else
			dispatch(
				fail(commentActionTypes.CREATE_COMMENT_FAILED, { error: result })
			)
	})
}

const createComment = commentRequest =>
	refreshTokenInterceptorIncBody(
		request(commentActionTypes.CREATE_COMMENT_REQUEST, {}),
		createAComment,
		commentRequest
	)

const getCommentsOfPost = (dispatch, postId) => {
	commentService.getAllPostComments(postId).then(result => {
		if (Array.isArray(result))
			dispatch(
				success(commentActionTypes.GET_ALL_POST_COMMENTS_SUCCESS, {
					comments: result
				})
			)
		else
			dispatch(
				fail(commentActionTypes.GET_ALL_POST_COMMENTS_FAILED, { error: result })
			)
	})
}

const getPostComments = postId =>
	refreshTokenInterceptorIncBody(
		request(commentActionTypes.GET_ALL_POST_COMMENTS_REQUEST, {}),
		getCommentsOfPost,
		postId
	)

const getUserComments = dispatch => {
	commentService.getAllUserComments().then(result => {
		if (Array.isArray(result))
			dispatch(
				success(commentActionTypes.GET_USER_COMMENTS_SUCCESS, {
					comments: result
				})
			)
		else
			dispatch(
				fail(commentActionTypes.GET_USER_COMMENTS_FAILED, { error: result })
			)
	})
}

const getAllUserComments = () =>
	refreshTokenInterceptor(
		request(commentActionTypes.GET_USER_COMMENTS_REQUEST, {}),
		getUserComments
	)

const updateAComment = (dispatch, commentRequest, commentId) => {
	commentService.updateComment(commentRequest, commentId).then(result => {
		if (result instanceof Object)
			dispatch(
				success(commentActionTypes.UPDATE_COMMENT_SUCCESS, { comment: result })
			)
		else
			dispatch(
				fail(commentActionTypes.UPDATE_COMMENT_FAILED, { error: result })
			)
	})
}

const updateComment = (commentRequest, commentId) =>
	refreshTokenInterceptorIncBody(
		request(commentActionTypes.UPDATE_COMMENT_REQUEST, {}),
		updateAComment,
		commentRequest,
		commentId
	)

const deleteAComment = (dispatch, commentId, postId) => {
	commentService.deleteComment(commentId).then(result => {
		if (result.startsWith('Comment'))
			dispatch(
				success(commentActionTypes.DELETE_COMMENT_SUCCESS, {
					message: result,
					commentId,
					postId
				})
			)
		else
			dispatch(
				fail(commentActionTypes.DELETE_COMMENT_FAILED, { error: result })
			)
	})
}

const deleteComment = (commentId, postId) =>
	refreshTokenInterceptorIncBody(
		request(commentActionTypes.DELETE_COMMENT_REQUEST, {}),
		deleteAComment,
		commentId,
		postId
	)

export const commentActions = {
	getComment,
	updateComment,
	deleteComment,
	getAllUserComments,
	createComment,
	getPostComments
}
