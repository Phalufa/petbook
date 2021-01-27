import './MyPosts.css'
import { useDispatch } from 'react-redux'
import { commentActions, postActions } from '../../../store/actions'
import { useNoScroll } from '../../../hooks/index'

/**
 * Confirm Box will pop out each time the user
 * wants to delete his comment/post
 **/
const ConfirmBox = ({
	postId,
	cancelDelete,
	commentId,
	postIdOfComment,
	onCommentDeleted
}) => {
	const dispatch = useDispatch()
	// diable window scroll when component is rendered
	useNoScroll()

	const confirmDeletePost = () => {
		dispatch(postActions.deletePost(postId))
		cancelDelete()
	}

	const confirmDeleteComment = () => {
		dispatch(commentActions.deleteComment(commentId, postIdOfComment))
		onCommentDeleted()
		cancelDelete()
	}

	const handleDelete = () => {
		if (postId) confirmDeletePost(postId)
		if (commentId) confirmDeleteComment(commentId)
	}

	return (
		<section className="Box-container">
			<div className="ConfirmBox">
				<div className="confirm-box-header">
					<button className="Button closeBtn" onClick={cancelDelete}>
						&#10006;
					</button>
					<h1>Are You Sure?</h1>
				</div>
				<div className="options">
					<button onClick={cancelDelete} className="SubmitButton">
						Cancel
					</button>
					<span className="space"></span>
					<button
						onClick={() => handleDelete()}
						className="SubmitButton delete-btn"
					>
						Delete
					</button>
				</div>
			</div>
		</section>
	)
}

export default ConfirmBox
