export const filterEquals = arr => {
	return arr.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
}

export const onCreate = (postId, comment, commentsState) => {
	commentsState[postId].comments = [comment].concat(
		commentsState[postId].comments
	)
	return commentsState
}

export const onUpdate = (postId, commentId, commentsState, comment) => {
	return commentsState[postId].comments.map(c => {
		if (c.id !== commentId) return c
		else return { ...c, ...comment }
	})
}

export const onDelete = (postId, commentsState, commentId) => {
	commentsState[postId].comments = commentsState[postId].comments.filter(
		c => c.id !== commentId
	)
	return commentsState
}

export const onGetPage = (commentsState, postId, payload) => {
	let { comments, pageNumber, lastPage } = payload
	let cmnts = filterEquals([...commentsState[postId].comments, ...comments])
	return { comments: cmnts, pageNumber, lastPage }
}

export const onCommentsInit = (payload, commentsState) => {
	payload.forEach(p => {
		if (!commentsState[p.postId]) {
			commentsState[p.postId] = {
				comments: [],
				lastPage: null,
				pageNumber: 0
			}
		}
	})
}
