import React from 'react'
import './Loader.css'
import { useSelector } from 'react-redux'

const Loader = () => {
	const isLoading = useSelector(state => state.requests.loading)
	
	const showLoader = () => {
		return isLoading ? <span className="loader"></span> : null
	}

	return showLoader()
}

export default Loader
