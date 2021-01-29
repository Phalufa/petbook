import './UserMenu.css'
import React from 'react'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useClickOutside } from '../../../hooks'

const UserMenu = ({
	loggedIn,
	openMenu,
	setOpenMenu,
	toggleMenu,
	hideMenuWhenClicked,
	createPostComponent,
	logoutAndRedirect
}) => {
	const menuRef = useClickOutside(() => setOpenMenu(false))

	const getButtonClass = () => {
		return openMenu ? 'ButtonActive' : 'Button'
	}

	const liWithLink = (url, title, icon) => {
		return (
			<Link to={url}>
				<li>
					<span>
						<FontAwesomeIcon icon={icon} />
					</span>
					{title}
				</li>
			</Link>
		)
	}

	const liWithFunc = (func, title, icon) => {
		return (
			<li onClick={func}>
				<span>
					<FontAwesomeIcon icon={icon} />
				</span>
				{title}
			</li>
		)
	}

	return (
		<div ref={menuRef}>
			{loggedIn && (
				<button onClick={() => toggleMenu()} className={getButtonClass()}>
					Menu
				</button>
			)}
			{/* menu items */}
			{openMenu && (
				<div className="UserMenu">
					<ul onClick={hideMenuWhenClicked}>
						{liWithLink('/user/profile', 'View Profile', faUserAlt)}
						{liWithLink('/user/posts', 'My Posts', faBookOpen)}
						{liWithFunc(
							e => createPostComponent(e),
							'Type Something',
							faCommentAlt
						)}
						{liWithFunc(logoutAndRedirect, 'Logout', faSignOutAlt)}
					</ul>
				</div>
			)}
		</div>
	)
}

export default UserMenu
