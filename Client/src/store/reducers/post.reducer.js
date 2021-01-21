import { postActionTypes } from '../actions/actionTypes'

const initialState = {
	posts: {
		user: [],
		all: []
	},
	lastPage: false,
	pageNumber: 0,
	error: null
}

export const postReducer = (state = initialState, action) => {
	let updatedPosts, users, all // copy of posts state object
	switch (action.type) {
		case postActionTypes.GET_POST_PAGE_REQUEST:
			return { ...state, requestPosts: true, lastPage: action.payload.lastPage }
		case postActionTypes.GET_POST_PAGE_SUCCESS:
			all = [...state.posts.all, ...action.payload.posts.all].filter(
				(v, i, a) => a.findIndex(t => t.postId === v.postId) === i
			)
			updatedPosts = {
				user: [...state.posts.user],
				all
			}
			return {
				...state,
				requestPosts: false,
				posts: updatedPosts,
				lastPage: action.payload.lastPage,
				pageNumber: action.payload.pageNumber,
				error: null
			}
		case postActionTypes.GET_POST_PAGE_FAILED:
			return {
				...state,
				requestPosts: false,
				...action.error
			}
		case postActionTypes.CLEAR_POSTS:
			return {
				...state,
				posts: {
					user: [],
					all: []
				},
				lastPage: false,
				pageNumber: 0
			}
		case postActionTypes.GET_ALL_POSTS_REQUEST:
			return { ...state, requestPosts: true }
		case postActionTypes.GET_ALL_POSTS_SUCCESS:
			return { requestPosts: false, posts: action.payload.posts, error: null }
		case postActionTypes.GET_ALL_POSTS_FAILED:
			return { ...state, requestPosts: false, ...action.error }
		case postActionTypes.GET_USER_POSTS_REQUEST:
			return { ...state, requestPosts: true }
		case postActionTypes.GET_USER_POSTS_SUCCESS:
			return {
				...state,
				requestPosts: false,
				posts: action.payload.posts,
				error: null
			}
		case postActionTypes.GET_USER_POSTS_FAILED:
			return { ...state, requestPosts: false, ...action.error }
		case postActionTypes.CREATE_POST_REQUEST:
			return { ...state, requestCreatePost: true }
		case postActionTypes.CREATE_POST_SUCCESS:
			updatedPosts = {
				user: [action.payload.newPost, ...state.posts.user],
				all: [action.payload.newPost, ...state.posts.all]
			}
			return {
				...state,
				requestCreatePost: false,
				posts: updatedPosts,
				error: null
			}
		case postActionTypes.CREATE_POST_FAILED:
			return { ...state, requestCreatePost: false, ...action.error }
		case postActionTypes.DELETE_POST_REQUEST:
			return { ...state, requestDeletePost: true }
		case postActionTypes.DELETE_POST_SUCCESS:
			updatedPosts = { ...state.posts }
			updatedPosts.user = updatedPosts.user.filter(
				p => p.postId !== action.payload.deletedPostId
			)
			updatedPosts.all = updatedPosts.all.filter(
				p => p.postId !== action.payload.deletedPostId
			)
			return {
				...state,
				requestDeletePost: false,
				posts: updatedPosts,
				message: action.payload.message,
				error: null
			}
		case postActionTypes.DELETE_POST_FAILED:
			return { ...state, requestDeletePost: false, ...action.error }
		case postActionTypes.UPDATE_POST_REQUEST:
			return { ...state, requestUpdatePost: true }
		case postActionTypes.UPDATE_POST_SUCCESS:
			users = [...state.posts.user].map(p => {
				if (p.postId !== action.payload.updatedPost.postId) return p
				else return { ...p, ...action.payload.updatedPost }
			})
			all = [...state.posts.all]
			updatedPosts = { user: users, all }
			return {
				...state,
				requestUpdatePost: false,
				posts: updatedPosts,
				message: action.payload.message,
				error: null
			}
		case postActionTypes.UPDATE_POST_FAILED:
			return { ...state, requestUpdatePost: false, ...action.error }
		default:
			return state
	}
}
