import React from 'react'
import './CreatePost.css'
import { useFormik } from 'formik'
import { checkRequired } from '../../../utils/validations'
import { useDispatch } from 'react-redux'
import { postActions } from '../../../store/actions'
import { useNoScroll } from '../../../helpers/hooks'

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
						{form.touched.postTitle && form.errors.postTitle ? (
							<div className="field-error">{form.errors.postTitle}</div>
						) : null}
						<textarea
							id="postContent"
							name="postContent"
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.postContent}
							placeholder="Your text"
						/>
						{form.touched.postContent && form.errors.postContent ? (
							<div className="field-error">{form.errors.postContent}</div>
						) : null}
						<button type="submit" className="SubmitButton">
							Post
						</button>
					</form>
				</article>
			</div>
		</section>
	)
}

export default CreatePost
