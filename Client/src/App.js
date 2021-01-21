import './App.css'
import Nav from './components/Nav/Nav'
import Main from './components/containers/Main/Main'
import { BrowserRouter as Router } from 'react-router-dom'
import { useState } from 'react'

const App = () => {
	// toggle create post component
	const [createPost, setCreatePost] = useState(false)

	const toggleCreatePostComponent = condition => {
		setCreatePost(condition)
	}

	return (
		<div className="App">
			<Router>
				<Nav toggleCreatePostComponent={toggleCreatePostComponent} />
				<Main
					createPost={createPost}
					toggleCreatePostComponent={toggleCreatePostComponent}
				/>
			</Router>
		</div>
	)
}

export default App
