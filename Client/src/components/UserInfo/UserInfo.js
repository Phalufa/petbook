import './UserInfo.css'
import React, { useEffect, useState } from 'react'
import { authService, userService } from '../../services'

const UserInfo = ({ author }) => {
	const [info, setInfo] = useState(null)

	useEffect(() => {
		authService.refreshToken()
		const inf = userService.getOtherUserDetails(author)
		inf.then(res => setInfo(res))
	}, [author])

	// remder user profile image, username, first name and last name
	const authorDetails = (username, firstName, lastName) => (
		<>
			<img src={userService.getUserProfileImage(author)} alt={author} />
			<div className="flex-column">
				<span>{username}</span>
				<span>
					{firstName}&nbsp;{lastName}
				</span>
			</div>
		</>
	)

	return (
		<main className="user-info-container">
			{info && (
				<section className="info">
					{authorDetails(author, info.firstName, info.lastName)}
				</section>
			)}
		</main>
	)
}

export default UserInfo
