import React from 'react'
import './Login.css'
import { useFormik } from 'formik'
import { checkRequired } from '../../utils/validations'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../store/actions/index'

const Login = () => {
	const error = useSelector(state => state.auth.error)
	const dispatch = useDispatch()

	const validate = values => {
		const errors = {}
		checkRequired(errors, values)
		return errors
	}

	const form = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validate,
		onSubmit: values => {
			const { username, password } = values
			dispatch(authActions.login(username, password))
		}
	})

	return (
		<>
			<form onSubmit={form.handleSubmit} className="LoginForm">
				<div>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.username}
					/>
				</div>
				<section className="error-section">
					{form.touched.username && form.errors.username ? (
						<span className="FormInputError">{form.errors.username}</span>
					) : null}
				</section>
				<div>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values.password}
					/>
				</div>
				<section className="error-section">
					{form.touched.password && form.errors.password ? (
						<span className="FormInputError">{form.errors.password}</span>
					) : null}
				</section>
				<button type="submit" className="SubmitButton">
					Login
				</button>
				<section className="error-section">
					{error && <span className="global-error">{error}</span>}
				</section>
			</form>
		</>
	)
}

export default Login
