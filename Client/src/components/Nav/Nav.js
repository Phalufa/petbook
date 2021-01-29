import React, { useState } from 'react'
import './Nav.css'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../store/actions'
import { Redirect, Link } from 'react-router-dom'
import UserMenu from './UserMenu/UserMenu'

const Nav = ({ toggleCreatePostComponent }) => {
	const loggedIn = useSelector(state => state.auth.loggedIn)
	const dispatch = useDispatch()

	const [openMenu, setOpenMenu] = useState(false)
	const [redirect, setRedirect] = useState(false)

	const logoutAndRedirect = () => {
		setOpenMenu(false)
		setRedirect(true)
		dispatch(authActions.logout())
	}

	const toggleMenu = () => {
		if (!openMenu) setOpenMenu(true)
		else setOpenMenu(false)
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

	const hideMenuWhenClicked = () => {
		setOpenMenu(false)
		toggleCreatePostComponent(false)
	}

	const createPostComponent = e => {
		e.stopPropagation()
		setOpenMenu(false) // hide user menu
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

				<UserMenu
					loggedIn={loggedIn}
					openMenu={openMenu}
					setOpenMenu={setOpenMenu}
					toggleMenu={toggleMenu}
					hideMenuWhenClicked={hideMenuWhenClicked}
					createPostComponent={createPostComponent}
					logoutAndRedirect={logoutAndRedirect}
				/>

				{/* redirect to login page after logout */}
				{redirect && <Redirect to="/login" />}
			</div>
		</div>
	)
}

export default Nav
