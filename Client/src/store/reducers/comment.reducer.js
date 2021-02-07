import {
	commentActionTypes as ACTION,
	postActionTypes
} from '../actions/actionTypes'
import * as utils from '../helpers'

const initialState = {
	userComments: [],
	byPostsIds: {}
}

export const commentReducer = (state = initialState, action) => {
	let newComments = { ...state.byPostsIds }
	switch (action.type) {
		case ACTION.CREATE_COMMENT_SUCCESS: {
			let { comment } = action.payload
			let { postId } = comment
			newComments = utils.onCreate(postId, comment, newComments)
			return { ...state, byPostsIds: newComments }
		}
		case ACTION.UPDATE_COMMENT_SUCCESS: {
			let comment = action.payload.comment
			let { postId, id } = comment
			newComments[postId].comments = utils.onUpdate(
				postId,
				id,
				newComments,
				comment
			)
			return { ...state, byPostsIds: newComments }
		}
		case ACTION.DELETE_COMMENT_SUCCESS: {
			let { postId, commentId } = action.payload
			newComments = utils.onDelete(postId, newComments, commentId)
			return { ...state, byPostsIds: newComments }
		}
		case ACTION.GET_COMMENT_SUCCESS: {
			return { ...state }
		}
		case ACTION.GET_USER_COMMENTS_SUCCESS: {
			return { ...state, userComments: action.payload.comments }
		}
		case ACTION.GET_ALL_POST_COMMENTS_SUCCESS: {
			newComments = { ...state.byPostsIds }
			if (action.payload.comments.length > 0) {
				let payload = action.payload.comments
				let { postId } = payload[0]
				newComments[postId] = payload
			}
			return { ...state, byPostsIds: newComments }
		}
		case ACTION.GET_COMMENT_PAGE_SUCCESS: {
			let { comments } = action.payload
			if (comments.length > 0) {
				let { postId } = comments[0]
				newComments[postId] = utils.onGetPage(
					newComments,
					postId,
					action.payload
				)
			}
			return { ...state, byPostsIds: newComments }
		}
		case postActionTypes.ADD_POST_ID_TO_COMMENTS: {
			utils.onCommentsInit(action.payload, newComments)
			return { ...state, byPostsIds: newComments }
		}
		case ACTION.CLEAR_COMMENTS: {
			return {
				...state,
				byPostsIds: {},
				userComments: []
			}
		}
		default:
			return state
	}
}
