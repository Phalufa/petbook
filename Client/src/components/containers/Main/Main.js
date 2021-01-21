import React from 'react'
import { useSelector } from 'react-redux'
import './Main.css'
import { appRoutes } from '../../../helpers/routes'
import Loader from '../../UI/Loader/Loader'
import CreatePost from '../../Post/CreatePost/CreatePost'

const Main = ({ createPost, toggleCreatePostComponent }) => {
	// user loggedIn state
	const isLoggedIn = useSelector(state => state.auth.loggedIn)

	const routes = appRoutes(isLoggedIn)

	return (
		<div className="Main">
			<Loader />
			{createPost && (
				<CreatePost toggleCreatePostComponent={toggleCreatePostComponent} />
			)}
			{routes}
		</div>
	)
}

export default Main
