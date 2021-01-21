import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../components/Login/Login'
import Profile from '../components/Profile/Profile'
import Register from '../components/Registration/Registration'
import Verification from '../components/Verification/Verification'
import PostList from '../components/containers/PostList/PostList'
import MyPosts from '../components/Post/MyPosts/MyPosts'

/**
 * app routes are imported in Main component
 **/

export const appRoutes = isLoggedIn => {
	const restricted = (
		<Switch>
			<Route path="/user/profile" component={Profile} />
			<Route path="/user/posts" component={MyPosts} />
			<Route path="/posts" component={PostList} />
			<Redirect to="/home" />
		</Switch>
	)
	const unrestricted = (
		<Switch>
			<Route path="/signup" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/verifyaccount" component={Verification} />
			<Redirect to="/login" />
		</Switch>
	)

	return isLoggedIn ? restricted : unrestricted
}
