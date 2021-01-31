import React, { useEffect, useState } from 'react'
import './CommentList.css'
import { useDispatch, useSelector } from 'react-redux'
import { commentActions } from '../../../store/actions'
import Comment from '../../Comment/Comment'
import CreateComment from '../../Comment/CreateComment/CreateComment'

const CommentList = ({
	postId,
	toggleComments,
	numOfComments,
	incrementCounter,
	decrementCounter
}) => {
	const postsComments = useSelector(state => state.comments.postsComments)
	const [pageNumber, setPageNumber] = useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(commentActions.getCommentPage(postId, { pageNumber }))
		setPageNumber(prevPage => prevPage + 1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const loadMore = () => {
		setPageNumber(prevPage => prevPage + 1)
		dispatch(commentActions.getCommentPage(postId, { pageNumber }))
	}

	// renders the comments after the post object
	// that contains the comments has been initialized
	const renderComments = () => {
		if (postsComments[postId]) {
			const { comments } = postsComments[postId]
			return comments.map(c => {
				return (
					<Comment key={c.id} comment={c} decrementCounter={decrementCounter} />
				)
			})
		}
	}

	// checks if it is the last page after the post object
	// that contains the last page has been initialized
	const lastPage = () => {
		if (postsComments[postId]) return postsComments[postId].lastPage
	}

	const viewMoreBtn = () => {
		if (!numOfComments) return
		return (
			!lastPage() &&
			toggleComments && (
				<div className="pointer blue-on-hover margin-top" onClick={loadMore}>
					View more...
				</div>
			)
		)
	}

	return (
		<section className="CommentList">
			{postsComments[postId] && <hr className="divider rotate" />}
			<CreateComment postId={postId} incrementCounter={incrementCounter} />
			{toggleComments && renderComments()}
			{viewMoreBtn()}
		</section>
	)
}

export default CommentList
