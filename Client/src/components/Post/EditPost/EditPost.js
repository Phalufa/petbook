import './EditPost.css'
import React from 'react'
import { useFormik } from 'formik'
import { checkRequired } from '../../../utils'
import { useDispatch } from 'react-redux'
import { postActions } from '../../../store/actions'
import { useNoScroll } from '../../../hooks'

const EditPost = ({ post, hideEditBox }) => {
	const dispatch = useDispatch()

	// diable browser window scroll when component is rendered
	useNoScroll()

	const { content, title } = post
	const validate = values => {
		const errors = {}
		checkRequired(errors, values)
		return errors
	}

	const form = useFormik({
		initialValues: {
			postTitle: title,
			postContent: content
		},
		validate,
		onSubmit: values => {
			const updatePostRequest = {
				id: post.postId,
				title: values.postTitle,
				content: values.postContent,
				url: post.url
			}
			dispatch(postActions.updatePost(updatePostRequest, post.postId))
			hideEditBox()
		}
	})

	const errorSection = fieldName => {
		return form.touched[fieldName] && form.errors[fieldName] ? (
			<div className="field-error">{form.errors[fieldName]}</div>
		) : null
	}

	const editPostForm = (
		<form onSubmit={form.handleSubmit}>
			<input
				id="postTitle"
				name="postTitle"
				type="text"
				onChange={form.handleChange}
				onBlur={form.handleBlur}
				value={form.values.postTitle}
				placeholder="Title"
			/>
			{errorSection('postTitle')}
			<textarea
				id="postContent"
				name="postContent"
				onChange={form.handleChange}
				onBlur={form.handleBlur}
				value={form.values.postContent}
				placeholder="Your text"
			/>
			{errorSection('postContent')}
			<button type="submit" className="SubmitButton">
				Save
			</button>
		</form>
	)

	return (
		<section className="Box-container">
			<div className="Box">
				<div className="sideImage"></div>
				<article>
					<div>
						<h1>Edit Post</h1>
						<button className="Button closeBtn" onClick={hideEditBox}>
							&#10006;
						</button>
					</div>
					{editPostForm}
				</article>
			</div>
		</section>
	)
}

export default EditPost
