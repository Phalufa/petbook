import React from 'react'
import './Login.css'
import { useFormik } from 'formik'
import { checkRequired } from '../../utils'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/actions'

const Login = () => {
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

	// Render input field errors
	const errorSection = fieldName => {
		return (
			<section className="error-section">
				{form.touched[fieldName] && form.errors[fieldName] ? (
					<span className="FormInputError">{form.errors[fieldName]}</span>
				) : null}
			</section>
		)
	}

	return (
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
			{errorSection('username')}
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
			{errorSection('password')}
			<button type="submit" className="SubmitButton">
				Login
			</button>
		</form>
	)
}

export default Login
