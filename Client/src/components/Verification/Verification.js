import React from 'react'
import './Verification.css'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/actions/auth.actions'

const Verification = () => {
	const dispatch = useDispatch()
	const verified = useSelector(state => state.register.verified)
	const signupResponse = useSelector(state => state.register.response)

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
			<form onSubmit={form.handleSubmit} className="VerifyAccountForm">
				<div>
					<label htmlFor="verificationToken">Account Verification Token</label>
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
				{signupResponse && (
					<span className="SuccessMessage">{signupResponse}</span>
				)}
				{verified && (
					<span className="SuccessMessage">Your account is now activated</span>
				)}
				<button type="submit" className="SubmitButton">
					Submit
				</button>
			</form>
		</>
	)
}

export default Verification
