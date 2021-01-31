import {
	commentActionTypes as act,
	postActionTypes
} from '../actions/actionTypes'
import * as utils from '../helpers'

const initialState = {
	userComments: [],
	postsComments: {}
}

export const commentReducer = (state = initialState, action) => {
	let newComments = { ...state.postsComments }
	switch (action.type) {
		case act.CREATE_COMMENT_SUCCESS: {
			let { comment } = action.payload
			let { postId } = comment
			newComments = utils.onCreate(postId, comment, newComments)
			return { ...state, postsComments: newComments }
		}
		case act.UPDATE_COMMENT_SUCCESS: {
			let comment = action.payload.comment
			let { postId, id } = comment
			newComments[postId].comments = utils.onUpdate(
				postId,
				id,
				newComments,
				comment
			)
			return { ...state, postsComments: newComments }
		}
		case act.DELETE_COMMENT_SUCCESS: {
			let { postId, commentId } = action.payload
			newComments = utils.onDelete(postId, newComments, commentId)
			return { ...state, postsComments: newComments }
		}
		case act.GET_COMMENT_SUCCESS: {
			return { ...state }
		}
		case act.GET_USER_COMMENTS_SUCCESS: {
			return { ...state, userComments: action.payload.comments }
		}
		case act.GET_ALL_POST_COMMENTS_SUCCESS: {
			newComments = { ...state.postsComments }
			if (action.payload.comments.length > 0) {
				let payload = action.payload.comments
				let { postId } = payload[0]
				newComments[postId] = payload
			}
			return { ...state, postsComments: newComments }
		}
		case act.GET_COMMENT_PAGE_SUCCESS: {
			let { comments } = action.payload
			if (comments.length > 0) {
				let { postId } = comments[0]
				newComments[postId] = utils.onGetPage(
					newComments,
					postId,
					action.payload
				)
			}
			return { ...state, postsComments: newComments }
		}
		case postActionTypes.ADD_POST_ID_TO_COMMENTS: {
			utils.onCommentsInit(action.payload, newComments)
			return { ...state, postsComments: newComments }
		}
		default:
			return state
	}
}
