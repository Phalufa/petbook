import { commentActionTypes } from "../actions/actionTypes"

const initialState = {
  request: false,
  userComments: [],
  postsComments: {},
  error: null
}

export const commentReducer = (state = initialState, action) => {
  let newComments, postId
  switch (action.type) {
    case commentActionTypes.CREATE_COMMENT_REQUEST:
      return { ...state, request: true }
    case commentActionTypes.CREATE_COMMENT_SUCCESS:
      newComments = { ...state.postsComments }
      let payload = action.payload.comment
      postId = action.payload.comment.postId
      let deepCopy
      if (newComments[payload.postId]) { // if post has comments
        deepCopy = newComments[payload.postId].concat(payload)
        newComments[payload.postId] = deepCopy
      } else {
        let newPostCommentsArr = [payload]
        newComments[postId] = newPostCommentsArr
      }
      return { ...state, request: false, postsComments: newComments }
    case commentActionTypes.CREATE_COMMENT_FAILED:
      return { ...state, request: false, error: action.error.error }
    case commentActionTypes.UPDATE_COMMENT_REQUEST:
      return { ...state, request: true }
    case commentActionTypes.UPDATE_COMMENT_SUCCESS:
      postId = action.payload.comment.postId
      newComments = { ...state.postsComments }
      newComments[postId] = newComments[postId].map(c => {
        if (c.id !== action.payload.comment.id) return c
        else return { ...c, ...action.payload.comment }
      })
      return { ...state, request: false, postsComments: newComments }
    case commentActionTypes.UPDATE_COMMENT_FAILED:
      return { ...state, request: false, error: action.error.error }
    case commentActionTypes.DELETE_COMMENT_REQUEST:
      return { ...state, request: true }
    case commentActionTypes.DELETE_COMMENT_SUCCESS:
      newComments = { ...state.postsComments }
      postId = action.payload.postId
      newComments[postId] = newComments[postId].filter(c => c.id !== action.payload.commentId)
      return { ...state, request: false, postsComments: newComments }
    case commentActionTypes.DELETE_COMMENT_FAILED:
      return { ...state, request: false, error: action.error.error }
    case commentActionTypes.GET_COMMENT_REQUEST:
      return { ...state, request: true }
    case commentActionTypes.GET_COMMENT_SUCCESS:
      return { ...state, request: false, }
    case commentActionTypes.GET_COMMENT_FAILED:
      return { ...state, request: false, error: action.error.error }
    case commentActionTypes.GET_USER_COMMENTS_REQUEST:
      return { ...state, request: true }
    case commentActionTypes.GET_USER_COMMENTS_SUCCESS:
      return { ...state, request: false, userComments: action.payload.comments }
    case commentActionTypes.GET_USER_COMMENTS_FAILED:
      return { ...state, request: false, error: action.error.error }
    case commentActionTypes.GET_ALL_POST_COMMENTS_REQUEST:
      return { ...state, request: true }
    case commentActionTypes.GET_ALL_POST_COMMENTS_SUCCESS:
      newComments = { ...state.postsComments }
      if (action.payload.comments.length > 0) {
        let payload = action.payload.comments
        let { postId } = payload[0]
        newComments[postId] = payload
      }
      return { ...state, request: false, postsComments: newComments }
    case commentActionTypes.GET_ALL_POST_COMMENTS_FAILED:
      return { ...state, request: false, error: action.error.error }
    default:
      return state
  }
}