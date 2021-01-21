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
	commentAdded,
	onCommentDeleted
}) => {
	const comments = useSelector(state => state.comments.postsComments)
	const dispatch = useDispatch()

	const [loadMoreComments, setLoadMoreComments] = useState(false)

	useEffect(() => {
		dispatch(commentActions.getPostComments(postId))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	let visibleComments = null
	let hiddenComments = null
	if (comments[postId]) {
		let allComments = [...comments[postId]].reverse()
		//  recent 2 comments of a post
		visibleComments = allComments
			.filter((c, i) => i < 2)
			.map(c => (
				<Comment key={c.id} comment={c} onCommentDeleted={onCommentDeleted} />
			))
		//  remaining comments by order (recently)
		hiddenComments = allComments
			.filter((c, i) => i >= 2)
			.map(c => (
				<Comment key={c.id} comment={c} onCommentDeleted={onCommentDeleted} />
			))
	}

	return (
		<section className="CommentList">
			{comments[postId] && <hr className="divider rotate" />}
			<CreateComment postId={postId} onCommentAdded={commentAdded} />
			{toggleComments && visibleComments}
			{toggleComments && !loadMoreComments && numOfComments > 2 && (
				<div
					className="pointer blue-on-hover margin-top"
					onClick={() => setLoadMoreComments(prevState => !prevState)}
				>
					View more...
				</div>
			)}
			{toggleComments && loadMoreComments && hiddenComments}
		</section>
	)
}

export default CommentList
