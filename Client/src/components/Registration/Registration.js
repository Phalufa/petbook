import React from 'react'
import { useFormik } from 'formik'
import './Registration.css'
import * as Utils from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/actions'
import { Redirect } from 'react-router-dom'

const Registration = () => {
	const dispatch = useDispatch()
	const signed = useSelector(state => state.register.signed)

	const validate = values => {
		let { firstName, lastName, username, password, dateOfBirth, email } = values
		const errors = {}
		Utils.checkRequired(errors, values)
		Utils.checkNamePattern(errors, 'firstName', firstName)
		Utils.checkNamePattern(errors, 'lastName', lastName)
		Utils.checkLength(errors, 'firstName', firstName, 20)
		Utils.checkLength(errors, 'lastName', lastName, 20)
		Utils.checkLength(errors, 'username', username, 20)
		Utils.checkPasswordLength(errors, 'password', password, 6, 20)
		Utils.checkEmailPattern(errors, 'email', email)
		Utils.checkBirthDate(errors, 'dateOfBirth', dateOfBirth)
		return errors
	}

	const form = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			dateOfBirth: {
				dayOfBirth: '',
				monthOfBirth: '',
				yearOfBirth: ''
			}
		},
		validate,
		onSubmit: values => {
			// convert values to date object
			const dateOfBirth = Utils.birthDateCreator(
				values.dateOfBirth.yearOfBirth,
				Utils.monthNames.indexOf(values.dateOfBirth.monthOfBirth),
				values.dateOfBirth.dayOfBirth
			)

			let { username, email, password, firstName, lastName } = values
			const signupRequest = {
				username,
				email,
				password,
				dateOfBirth,
				firstName,
				lastName
			}
			dispatch(authActions.registerAccount(signupRequest))
		}
	})

	const errorSection = fieldName => {
		return form.touched[fieldName] && form.errors[fieldName] ? (
			<span className="FormInputError">{form.errors[fieldName]}</span>
		) : null
	}

	const signupForm = (
		<form onSubmit={form.handleSubmit} className="SignupForm">
			<div>
				<label htmlFor="firstName">First Name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					placeholder="e.g. Juan"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.firstName}
				/>
			</div>
			{errorSection('firstName')}
			<div>
				<label htmlFor="lastName">Last Name</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					placeholder="e.g. Riquelme"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.lastName}
				/>
			</div>
			{errorSection('lastName')}
			<div>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					name="username"
					type="text"
					placeholder="e.g. Meow3000"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.username}
				/>
			</div>
			{errorSection('username')}
			<div>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="text"
					placeholder="e.g. roman@gmail.com"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.email}
				/>
			</div>
			{errorSection('email')}
			<div>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="* 6 characters long +"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.password}
				/>
			</div>
			{errorSection('password')}
			<fieldset htmlFor="dayOfBirth">
				<legend>Birth Date</legend>
				<div className="SignupFormDateFields">
					<select
						id="dayOfBirth"
						name="dateOfBirth.dayOfBirth"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					>
						<option hidden value={''}>
							Day
						</option>
						{Utils.dayOptions()}
					</select>
					<select
						id="monthOfBirth"
						name="dateOfBirth.monthOfBirth"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					>
						<option hidden value={''}>
							Month
						</option>
						{Utils.monthNamesOptions()}
					</select>
					<select
						id="yearOfBirth"
						name="dateOfBirth.yearOfBirth"
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					>
						<option hidden value={''}>
							Year
						</option>
						{Utils.yearOptions()}
					</select>
				</div>
			</fieldset>
			{errorSection('dateOfBirth')}
			<button type="submit" className="SubmitButton">
				Submit
			</button>
		</form>
	)

	return <>{signed ? <Redirect to="verifyaccount" /> : signupForm}</>
}

export default Registration
