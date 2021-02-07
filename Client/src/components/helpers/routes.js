import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import Register from '../Registration/Registration'
import Verification from '../Verification/Verification'
import PostList from '../containers/PostList/PostList'
import MyPosts from '../Post/MyPosts/MyPosts'
import MyComments from '../Comment/MyComments/MyComments'

/**
 * app routes are imported in Main component
 **/

export const appRoutes = isLoggedIn => {
	const restricted = (
		<Switch>
			<Route path="/user/profile" component={Profile} />
			<Route path="/user/posts" component={MyPosts} />
			<Route path="/user/comments" component={MyComments} />
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
