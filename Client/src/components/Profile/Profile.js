import React, { useEffect, useState, useRef } from 'react'
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../store/actions/index'
import { Redirect } from 'react-router-dom'
import EditUserDetails from './EditUserDetails'
import { Link } from 'react-router-dom'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userService } from '../../services'

const Profile = () => {
	const isLoggedIn = useSelector(state => state.auth.loggedIn)
	const username = useSelector(state => state.auth.user)
	const user = useSelector(state => state.user)
  const dispatch = useDispatch()

	const [toggleEdit, setToggleEdit] = useState(false)
	const [img, setImg] = useState(null)
	const refEl = useRef(null)

	const { email, firstName, lastName, image, id } = user

	useEffect(() => {
		dispatch(userActions.getProfile())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const closeEditBox = () => {
		setToggleEdit(false)
	}

	const openEditComponent = () => {
		if (toggleEdit)
			return (
				<EditUserDetails
					closeBox={closeEditBox}
					username={username}
					email={email}
					firstName={firstName}
					lastName={lastName}
					image={image}
					id={id}
				/>
			)
	}

	const handleChange = event => {
		event.preventDefault()
		setImg(refEl.current.files[0])
	}

	const uploadAvatar = event => {
		event.preventDefault()
		userService.uploadUserImage(img, id)
	}

	return (
		<>
			{!isLoggedIn ? (
				<Redirect to="/login" />
			) : (
				<section className="Profile">
					<h1>{username}</h1>
					{image && (
						<div className="center">
							<img
								className="avatar"
								src={userService.downloadUserImage(id)}
								alt={username}
							/>
						</div>
					)}
					<div className="Details">
						<span>{`${firstName} ${lastName}`}</span>
						<span>{email}</span>
						<hr className="divider" />
						<Link to="/user/posts">Your posts</Link>
						<Link to="/user/comments">Your comments</Link>
					</div>

					<div className="edit-details">
						<button
							className="Button"
							onClick={() => setToggleEdit(!toggleEdit)}
						>
							Edit Your Details
						</button>
						{openEditComponent()}
					</div>

					<form className="image-upload">
						<label htmlFor="image-upload" className="Button">
							upload profile image
						</label>
						<input
							ref={refEl}
							id="image-upload"
							onChange={handleChange}
							type="file"
							accept="image/*"
							className="custom-file-input"
						/>
						<button
							type="submit"
							disabled={!img}
							className={`Button enlarge-icon FilledButton ${
								!img && 'disabled'
							}`}
							onClick={event => uploadAvatar(event)}
						>
							<FontAwesomeIcon icon={faUpload} /> save
						</button>
					</form>
				</section>
			)}
		</>
	)
}

export default Profile
