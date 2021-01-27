import React from 'react'
import { useFormik } from 'formik'
import './Registration.css'
import * as Utils from '../../utils/validations'
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

	return (
		<>
			{signed ? (
				<Redirect to="verifyaccount" />
			) : (
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
					{form.touched.firstName && form.errors.firstName ? (
						<span className="FormInputError">{form.errors.firstName}</span>
					) : null}
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
					{form.touched.lastName && form.errors.lastName ? (
						<span className="FormInputError">{form.errors.lastName}</span>
					) : null}
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
					{form.touched.username && form.errors.username ? (
						<span className="FormInputError">{form.errors.username}</span>
					) : null}
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
					{form.touched.email && form.errors.email ? (
						<span className="FormInputError">{form.errors.email}</span>
					) : null}
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
					{form.touched.password && form.errors.password ? (
						<span className="FormInputError">{form.errors.password}</span>
					) : null}
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
					{form.touched.dateOfBirth && form.errors.dateOfBirth ? (
						<span className="FormInputError">{form.errors.dateOfBirth}</span>
					) : null}
					<button type="submit" className="SubmitButton">
						Submit
					</button>
				</form>
			)}
		</>
	)
}

export default Registration
