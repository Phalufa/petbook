import React, { useState } from 'react'
import './Post.css'
import CommentList from '../containers/CommentList/CommentList'
import { createdTime } from '../../utils'
import { userService } from '../../services'
import UserInfo from '../UserInfo/UserInfo'
import { useClickOutside } from '../../hooks'

const Post = ({ user, userImage, title, date, content, numOfComments, id }) => {
	const [showComments, setShowComments] = useState(true)
	const [toggleAuthor, setToggleAuthor] = useState(false)
	const [commentCount, setCommentCount] = useState(numOfComments)
	const authorInfoRef = useClickOutside(() => setToggleAuthor(false))

	// show/hide comments
	const toggleComments = () => {
		setShowComments(prevState => !prevState)
	}

	// increment comment counter
	const incrementCounter = () => {
		setCommentCount(commentCount + 1)
	}

	// decrement comment counter
	const decrementCounter = () => {
		setCommentCount(commentCount - 1)
	}

	const renderUserImage = userImage && (
		<img
			className="post-profile-image"
			src={userService.getUserProfileImage(user)}
			alt={user}
			onClick={() => setToggleAuthor(!toggleAuthor)}
		/>
	)

	const postHeader = (
		<div className="post-header">
			<div>
				<h1 className="PostTitle">{title}</h1>
				<div className="PostDate">{createdTime(date)}</div>
			</div>
			<div className="user" ref={authorInfoRef}>
				{renderUserImage}
				{toggleAuthor && <UserInfo author={user} />}
			</div>
		</div>
	)

	const postFooter = (
		<div className="post-footer">
			<div className="PostnumOfComments" onClick={toggleComments}>
				{commentCount} {commentCount > 1 ? 'comments' : 'comment'}
			</div>
		</div>
	)

	return (
		<section className="post-container">
			<article className="post">
				{postHeader}
				<hr className="divider" />
				<div className="PostContent">{content}</div>
				{postFooter}
				<CommentList
					postId={id}
					toggleComments={showComments}
					numOfComments={commentCount}
					incrementCounter={incrementCounter}
					decrementCounter={decrementCounter}
				/>
			</article>
		</section>
	)
}

export default Post
