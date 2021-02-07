import '../../Post/MyPosts/MyPosts.css'
import './MyComments.css'
import React, { useEffect } from 'react'
import { createdTimeLocal } from '../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { commentActions } from '../../../store/actions'

const MyComments = () => {
	const comments = useSelector(state => state.comments.userComments)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(commentActions.getAllUserComments())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const commentsTable = () => {
		return comments.map((comment, index) => {
			const { id, postId, timeCreated, content } = comment
			console.log(comment)
			return (
				<tr key={id}>
					<td>{index + 1}</td>
					<td className="break">{content}</td>
					<td>{createdTimeLocal(timeCreated)}</td>
					{/* <td>{postId}</td> */}
				</tr>
			)
		})
	}

	const commentsTableHeaders = () => {
		return (
			<tr>
				<th key="number">n.</th>
				<th key="content">content</th>
				<th key="date">date</th>
				{/* <th key="post">post</th> */}
			</tr>
		)
	}

	return (
		<section className="MyPosts MyComments">
			<table>
				<tbody>
					{commentsTableHeaders()}
					{commentsTable()}
				</tbody>
			</table>
		</section>
	)
}

export default MyComments
