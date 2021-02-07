import React from 'react'
import { useSelector } from 'react-redux'
import './Main.css'
import { appRoutes } from '../../helpers'
import Loader from '../../UI/Loader/Loader'
import CreatePost from '../../Post/CreatePost/CreatePost'
import Notification from '../../UI/Notification/Notification'

const Main = ({ createPost, toggleCreatePostComponent }) => {
	const isLoggedIn = useSelector(state => state.auth.loggedIn)
	const routes = appRoutes(isLoggedIn)

	return (
		<div className="Main">
			<Loader />
			<Notification milliseconds={6000} />
			{createPost && (
				<CreatePost toggleCreatePostComponent={toggleCreatePostComponent} />
			)}
			{routes}
		</div>
	)
}

export default Main
