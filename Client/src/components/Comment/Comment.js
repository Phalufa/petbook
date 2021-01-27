import './Comment.css'
import React, { useState } from 'react'
import { createdTimeShort } from '../../utils/time'
import ConfirmBox from '../Post/MyPosts/ConfirmBox'
import { authentication as auth } from '../../services/helpers/authentication'
import { useClickOutside } from '../../hooks/clickOutside'
import EditComment from './EditComment/EditComment'
import { userService } from '../../services'
import UserInfo from '../UserInfo/UserInfo'

const Comment = ({ comment, onCommentDeleted }) => {
	const [
		showConfirmationBoxOnDelete,
		setShowConfirmationBoxOnDelete
	] = useState(false)
	const [showCommentMenu, setShowCommentMenu] = useState(false)
	const [displayMenuBtn, setDisplayMenuBtn] = useState(false)
	const [editComment, setEditComment] = useState(false)
	const [toggleAuthor, setToggleAuthor] = useState(false)
	const authorInfoRef = useClickOutside(() => setToggleAuthor(false))
	const { id, username, timeCreated, content, postId } = comment

	const isUserComment = auth.getUser() === username

	const handleCancelDelete = () => {
		setShowConfirmationBoxOnDelete(false)
	}

	const toggleMenu = () => {
		setShowCommentMenu(prevState => !prevState)
		setDisplayMenuBtn(true)
	}

	const onDelete = () => {
		setShowConfirmationBoxOnDelete(prevState => !prevState)
		setShowCommentMenu(false)
	}

	const onEdit = () => {
		setEditComment(true)
		setShowCommentMenu(false)
	}

	const cancelEdit = () => {
		setEditComment(false)
	}

	const menuRef = useClickOutside(() => {
		setShowCommentMenu(false)
		setDisplayMenuBtn(false)
	})

	const menu = (
		<div className="comment-menu">
			<li className="pointer" onClick={onEdit}>
				Edit
			</li>
			<li className="pointer" onClick={onDelete}>
				Delete
			</li>
		</div>
	)

	const menuButton = (
		<div>
			<button className="comment-menu-btn" onClick={toggleMenu}>
				&#8942;
			</button>
		</div>
	)

	const hideMenu = () => {
		if (!showCommentMenu) setDisplayMenuBtn(false)
	}

	return (
		<div
			className="Comment"
			onMouseOver={() => setDisplayMenuBtn(true)}
			onMouseLeave={hideMenu}
		>
			<div className="comment-core">
				<div className="CommentHeader">
					<div>
						<h4>{username}</h4>
						<h5>{createdTimeShort(timeCreated)}</h5>
					</div>
					<span ref={authorInfoRef} className="author-image">
						<img
							src={userService.getUserProfileImage(username)}
							alt={username}
							onClick={() => setToggleAuthor(!toggleAuthor)}
						/>
						{toggleAuthor && <UserInfo author={username} />}
					</span>
				</div>
				<div className="content">
					{!editComment && content}
					{editComment && (
						<EditComment comment={comment} cancelEdit={cancelEdit} />
					)}
				</div>
			</div>
			<div className="relative text-right">
				<div ref={menuRef}>
					{isUserComment && displayMenuBtn && menuButton}
					{showCommentMenu && menu}
				</div>
			</div>
			{showConfirmationBoxOnDelete && (
				<ConfirmBox
					commentId={id}
					cancelDelete={handleCancelDelete}
					postIdOfComment={postId}
					onCommentDeleted={onCommentDeleted}
				/>
			)}
		</div>
	)
}

export default Comment
