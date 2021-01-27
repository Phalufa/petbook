import React from 'react'
import './Verification.css'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/actions/auth.actions'
import { Redirect } from 'react-router-dom'

const Verification = () => {
	const dispatch = useDispatch()
	const isVerified = useSelector(state => state.register.verified)
	const isLoggedIn = useSelector(state => state.auth.loggedIn)

	const validate = values => {
		const errors = {}
		if (values.verificationToken.length !== 36)
			errors.verificationToken = 'Verification Token must be 36 characters'
		return errors
	}

	const form = useFormik({
		initialValues: {
			verificationToken: ''
		},
		validate,
		onSubmit: values => {
			const verificationToken = values.verificationToken
			dispatch(authActions.verifyAccount(verificationToken))
		}
	})

	return (
		<>
			{isVerified || isLoggedIn ? (
				<Redirect to="home" />
			) : (
				<form onSubmit={form.handleSubmit} className="VerifyAccountForm">
					<div>
						<label htmlFor="verificationToken">
							Account Verification Token
						</label>
						<input
							id="verificationToken"
							name="verificationToken"
							type="text"
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							value={form.values.verificationToken}
						/>
					</div>
					{form.touched.verificationToken && form.errors.verificationToken ? (
						<span className="FormInputError">
							{form.errors.verificationToken}
						</span>
					) : null}
					<button type="submit" className="SubmitButton">
						Submit
					</button>
				</form>
			)}
		</>
	)
}

export default Verification
