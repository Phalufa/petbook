import React from 'react'
import './EditUserDetails.css'
import { useFormik } from 'formik'
import * as Utils from '../../utils/validations'
import { connect } from 'react-redux'
import { userActions } from '../../store/actions/index'
import { useNoScroll } from '../../hooks/index'

const EditUserDetails = ({
  username,
  image,
  email,
  firstName,
  lastName,
  error,
  updateProfile,
  id,
  closeBox }) => {
  useNoScroll()

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
      password: '',
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
      updateProfile(updateUserRequest)
      closeBox()
    }
  })

  return (
    <div className="Box-container">
      <div className="EditDetailsBox">
        <div>
          <h1>Edit Details</h1>
          <button className="Button closeBtn" onClick={closeBox}>&#10006;</button>
        </div>
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
          {form.touched.email && form.errors.email ? <span className="FormInputError">{form.errors.email}</span> : null}
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
          {form.touched.firstName && form.errors.firstName ? <span className="FormInputError">{form.errors.firstName}</span> : null}
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
          {form.touched.lastName && form.errors.lastName ? <span className="FormInputError">{form.errors.lastName}</span> : null}
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
          {form.touched.password && form.errors.password ? <span className="FormInputError">{form.errors.password}</span> : null}
          {error ? <span className="FormInputError">{error}</span> : null}
          <button type="submit" className="SubmitButton">Save</button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = {
  updateProfile: userActions.updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserDetails)