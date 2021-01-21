import React, { useState } from 'react'
import './Nav.css'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../store/actions/index'
import { Redirect, Link } from 'react-router-dom'
import { useClickOutside } from '../../helpers/hooks'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Nav = ({ toggleCreatePostComponent }) => {
	const loggedIn = useSelector(state => state.auth.loggedIn)
	const dispatch = useDispatch()

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [redirect, setRedirect] = useState(false)
	const menuRef = useClickOutside(() => setIsMenuOpen(false))

	const logoutAndRedirect = () => {
		setIsMenuOpen(false)
		setRedirect(true)
		dispatch(authActions.logout())
	}

	const toggleMenu = () => {
		if (!isMenuOpen) setIsMenuOpen(true)
		else setIsMenuOpen(false)
	}

	// toggle classes if menu is open/closed
	const getButtonClass = () => {
		return isMenuOpen ? 'ButtonActive' : 'Button'
	}

	const loginBtn = (
		<Link to="/login">
			<button className="Button">log in</button>
		</Link>
	)

	const signupBtn = (
		<Link to="/signup">
			<button className={`Button FilledButton`}>sign up</button>
		</Link>
	)

	const hideMenuAndCreatePostComponent = () => {
		setIsMenuOpen(false)
		toggleCreatePostComponent(false)
	}

	const createPostComponent = e => {
		e.stopPropagation()
		setIsMenuOpen(false) // hide user menu
		toggleCreatePostComponent(true) // show CreatePost component
	}

	// posts button
	const lobbyBtn = (
		<Link to="/posts">
			<button className="Button FilledButton">lobby</button>
		</Link>
	)

	return (
		<div className="HeaderContainer">
			{/* Logo */}
			<Link to="/home">
				<span className="Logo">Petbook</span>
			</Link>

			<div>
				{/* login & signup buttons */}
				{!loggedIn && loginBtn}
				{!loggedIn && signupBtn}

				{/* posts button */}
				{loggedIn && lobbyBtn}

				{/* menu button */}
				<div ref={menuRef}>
					{loggedIn && (
						<button onClick={() => toggleMenu()} className={getButtonClass()}>
							Menu
						</button>
					)}
					{/* menu items */}
					{isMenuOpen && (
						<div className="UserMenu">
							<ul onClick={hideMenuAndCreatePostComponent}>
								<Link to="/user/profile">
									<li>
										<span>
											<FontAwesomeIcon icon={faUserAlt} />
										</span>
										View Profile
									</li>
								</Link>
								<Link to="/user/posts">
									<li>
										<span>
											<FontAwesomeIcon icon={faBookOpen} />
										</span>
										My Posts
									</li>
								</Link>
								<li onClick={e => createPostComponent(e)}>
									<span>
										<FontAwesomeIcon icon={faCommentAlt} />
									</span>
									Type Something
								</li>
								<li onClick={logoutAndRedirect}>
									<span>
										<FontAwesomeIcon icon={faSignOutAlt} />
									</span>
									Logout
								</li>
							</ul>
						</div>
					)}
				</div>

				{/* redirect to login page after logout */}
				{redirect && <Redirect to="/login" />}
			</div>
		</div>
	)
}

export default Nav
