import React from 'react'
import './CreatePost.css'
import { useFormik } from 'formik'
import { checkRequired } from '../../../utils'
import { useDispatch } from 'react-redux'
import { postActions } from '../../../store/actions'
import { useNoScroll } from '../../../hooks'

const CreatePost = ({ toggleCreatePostComponent }) => {
	const dispatch = useDispatch()

	// diable window scroll when component is rendered
	useNoScroll()

	const validate = values => {
		const errors = {}
		checkRequired(errors, values)
		return errors
	}

	const form = useFormik({
		initialValues: {
			postTitle: '',
			postContent: ''
		},
		validate,
		onSubmit: values => {
			const { postTitle, postContent } = values
			const postRequest = {
				title: postTitle,
				content: postContent,
				url: null,
				id: null
			}
			dispatch(postActions.createPost(postRequest))
			toggleCreatePostComponent(false)
		}
	})

	const errorSection = fieldName => {
		return form.touched[fieldName] && form.errors[fieldName] ? (
			<div className="field-error">{form.errors[fieldName]}</div>
		) : null
	}

	const createPostForm = (
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
				Post
			</button>
		</form>
	)

	return (
		<section className="Box-container">
			<div className="Box" onClick={null}>
				<div className="sideImage create-image"></div>
				<article>
					<div>
						<h1>Create a Post</h1>
						<button
							className="Button closeBtn"
							onClick={() => toggleCreatePostComponent(false)}
						>
							&#10006;
						</button>
					</div>
					{createPostForm}
				</article>
			</div>
		</section>
	)
}

export default CreatePost
