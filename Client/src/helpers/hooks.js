import { useEffect, useRef, useState } from 'react'
import { postActions } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

export const useClickOutside = handler => {
	let domElement = useRef()

	useEffect(() => {
		let anyHandler = event => {
			if (!domElement.current.contains(event.target)) handler()
		}
		document.addEventListener('mousedown', anyHandler)
		return () => document.removeEventListener('mousedown', anyHandler)
	})
	return domElement
}

export const useNoScroll = () => {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => (document.body.style.overflow = 'auto')
	}, [])
}

export const usePostPagination = (pageNumber, pageSize = 3) => {
	const [hasEnded, setHasEnded] = useState(false)
	const posts = useSelector(state => state.posts.posts.all)
	const lastPage = useSelector(state => state.posts.lastPage)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(
			postActions.getPostPage({
				pageNumber,
				pageSize
			})
		)
		if (lastPage) setHasEnded(lastPage)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageNumber, pageSize, hasEnded])

	return { posts, hasEnded }
}
