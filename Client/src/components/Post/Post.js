import React, { useState } from 'react'
import './Post.css'
import CommentList from '../containers/CommentList/CommentList'
import { createdTime } from '../../helpers/time'
import { userService } from '../../services'
import UserInfo from '../UserInfo/UserInfo'
import { useClickOutside } from '../../helpers/hooks'

const Post = ({ user, userImage, title, date, content, numOfComments, id }) => {
	const [toggleComments, setToggleComments] = useState(true)
	const [toggleAuthor, setToggleAuthor] = useState(false)
	const [commentCount, setCommentCount] = useState(numOfComments)
	const authorInfoRef = useClickOutside(() => setToggleAuthor(false))

  // show/hide comments
	const onToggleComments = () => {
		setToggleComments(prevState => !prevState)
	}

  // increment comment counter
	const onCommentAdded = () => {
		setCommentCount(commentCount + 1)
	}

  // decrement comment counter
	const onCommentDeleted = () => {
		setCommentCount(commentCount - 1)
	}

	return (
		<section className="post-container">
			<article className="post">
				<div className="post-header">
					<div>
						<h1 className="PostTitle">{title}</h1>
						<div className="PostDate">{createdTime(date)}</div>
					</div>
					<div className="user" ref={authorInfoRef}>
						{userImage && (
							<img
								className="post-profile-image"
								src={userService.getUserProfileImage(user)}
								alt={user}
								onClick={() => setToggleAuthor(!toggleAuthor)}
							/>
						)}
						{toggleAuthor && <UserInfo author={user} />}
					</div>
				</div>
				<hr className="divider" />
				<div className="PostContent">{content}</div>
				<div className="post-footer">
					<div className="PostnumOfComments" onClick={onToggleComments}>
						{commentCount} {commentCount > 1 ? 'comments' : 'comment'}
					</div>
				</div>
				<CommentList
					postId={id}
					toggleComments={toggleComments}
					numOfComments={commentCount}
					commentAdded={onCommentAdded}
					onCommentDeleted={onCommentDeleted}
				/>
			</article>
		</section>
	)
}

export default Post
