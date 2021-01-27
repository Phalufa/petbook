import React, { useEffect, useState } from 'react'
import './MyPosts.css'
import { useSelector, useDispatch } from 'react-redux'
import { postActions } from '../../../store/actions'
import { authentication as auth } from '../../../services/helpers/authentication'
import { createdTimeLocal } from '../../../utils/time'
import EditPost from '../EditPost/EditPost'
import ConfirmBox from './ConfirmBox'

const MyPosts = () => {
	const dispatch = useDispatch()
	// user posts state
	const posts = useSelector(state => state.posts.posts.user)

	const [editPost, setEditPost] = useState(null)
	const [postIdToDelete, setPostIdToDelete] = useState(null)
	const [
		showConfirmationBoxOnDelete,
		setShowConfirmationBoxOnDelete
	] = useState(false)
	const [showEditBox, setShowEditBox] = useState(false)

	useEffect(() => {
		dispatch(postActions.getPostsByUser(auth.getUser()))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// show ConfirmBox
	const handleDelete = id => {
		setPostIdToDelete(id)
		setShowConfirmationBoxOnDelete(true)
	}

	// hide ConfirmBox
	const handleCancelDelete = () => {
		setShowConfirmationBoxOnDelete(false)
	}

	// show EditPost
	const handleEdit = id => {
		const chosenPost = posts.find(p => p.postId === id)
		setEditPost(chosenPost)
		setShowEditBox(true)
	}

	const hideEditBox = () => {
		setShowEditBox(false)
	}

	const postsTable = () => {
		return posts.map((post, index) => {
			const { postId, title, timeCreated, numOfComments } = post
			return (
				<tr key={postId}>
					<td>{index + 1}</td>
					<td>{title}</td>
					<td>{createdTimeLocal(timeCreated)}</td>
					<td>{numOfComments}</td>
					<td>
						<button
							onClick={() => handleEdit(postId)}
							className="SubmitButton center-text"
						>
							edit
						</button>
					</td>
					<td>
						<button
							onClick={() => handleDelete(postId)}
							className="SubmitButton center-text"
						>
							delete
						</button>
					</td>
				</tr>
			)
		})
	}

	const postsTableHeaders = () => {
		return (
			<tr>
				<th key="number">n.</th>
				<th key="title">title</th>
				<th key="date">date</th>
				<th key="comments">comments</th>
				<th key="edit"></th>
				<th key="delete"></th>
			</tr>
		)
	}

	return (
		<section className="MyPosts">
			<table>
				<tbody>
					{postsTableHeaders()}
					{postsTable()}
				</tbody>
			</table>
			{showEditBox && <EditPost post={editPost} hideEditBox={hideEditBox} />}
			{showConfirmationBoxOnDelete && (
				<ConfirmBox postId={postIdToDelete} cancelDelete={handleCancelDelete} />
			)}
		</section>
	)
}

export default MyPosts
