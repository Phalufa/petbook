import React from 'react'
import './EditUserDetails.css'
import { useFormik } from 'formik'
import * as Utils from '../../utils'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/actions'
import { useNoScroll } from '../../hooks'

const EditUserDetails = ({
	username,
	image,
	email,
	firstName,
	lastName,
	id,
	closeBox
}) => {
	useNoScroll()
	const dispatch = useDispatch()

	const validate = values => {
		const errors = {}
		Utils.checkRequired(errors, values)
		Utils.checkNamePattern(errors, 'firstName', values.firstName)
		Utils.checkNamePattern(errors, 'lastName', values.lastName)
		Utils.checkLength(errors, 'firstName', values.firstName, 20)
		Utils.checkLength(errors, 'lastName', values.lastName, 20)
		Utils.checkPasswordLength(errors, 'password', values.password, 6, 20)
		Utils.checkEmailPattern(errors, 'email', values.email)
		return errors
	}

	const form = useFormik({
		initialValues: {
			email: email,
			firstName: firstName,
			lastName: lastName,
			password: ''
		},
		validate,
		onSubmit: values => {
			const updateUserRequest = {
				id: id,
				username: username,
				email: values.email,
				firstName: values.firstName,
				lastName: values.lastName,
				password: values.password,
				image: image
			}
			dispatch(userActions.updateProfile(updateUserRequest))
			closeBox()
		}
	})

	const errorSection = fieldName => {
		return form.touched[fieldName] && form.errors[fieldName] ? (
			<span className="FormInputError">{form.errors[fieldName]}</span>
		) : null
	}

	const editUserDetailsForm = (
		<form onSubmit={form.handleSubmit} className="SignupForm">
			<div>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="text"
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.email}
				/>
			</div>
			{errorSection('email')}
			<div>
				<label htmlFor="firstName">First Name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
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
					onChange={form.handleChange}
					onBlur={form.handleBlur}
					value={form.values.lastName}
				/>
			</div>
			{errorSection('lastName')}
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
				Save
			</button>
		</form>
	)

	return (
		<div className="Box-container">
			<div className="EditDetailsBox">
				<div>
					<h1>Edit Details</h1>
					<button className="Button closeBtn" onClick={closeBox}>
						&#10006;
					</button>
				</div>
				{editUserDetailsForm}
			</div>
		</div>
	)
}

export default EditUserDetails
