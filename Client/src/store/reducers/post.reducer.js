import { postActionTypes as ACTION } from '../actions/actionTypes'

const initialState = {
	posts: {
		user: [],
		all: []
	},
	lastPage: false,
	pageNumber: 0
}

export const postReducer = (state = initialState, action) => {
	let a, u
	switch (action.type) {
		case ACTION.GET_POST_PAGE_SUCCESS:
			a = filterEquals([...state.posts.all, ...action.payload.posts.all])
			return {
				...state,
				posts: { user: [...state.posts.user], all: a },
				lastPage: action.payload.lastPage,
				pageNumber: action.payload.pageNumber
			}
		case ACTION.GET_ALL_POSTS_SUCCESS:
			return { ...state, posts: action.payload.posts }

		case ACTION.GET_USER_POSTS_SUCCESS:
			return { ...state, posts: action.payload.posts }
		case ACTION.CREATE_POST_SUCCESS:
			return {
				...state,
				posts: {
					user: [action.payload.newPost, ...state.posts.user],
					all: [action.payload.newPost, ...state.posts.all]
				}
			}
		case ACTION.DELETE_POST_SUCCESS:
			u = [...state.posts.user].filter(
				p => p.postId !== action.payload.deletedPostId
			)
			return {
				...state,
				posts: { user: u, all: [...state.posts.all] }
			}
		case ACTION.UPDATE_POST_SUCCESS:
			u = [...state.posts.user].map(p => {
				if (p.postId !== action.payload.updatedPost.postId) return p
				else return { ...p, ...action.payload.updatedPost }
			})
			return {
				...state,
				posts: { user: u, all: [...state.posts.all] }
			}
		case ACTION.CLEAR_POSTS:
			return {
				...state,
				posts: { user: [], all: [] },
				lastPage: false,
				pageNumber: 0
			}
		default:
			return state
	}
}

const filterEquals = arr => {
	return arr.filter((v, i, a) => a.findIndex(t => t.postId === v.postId) === i)
}
