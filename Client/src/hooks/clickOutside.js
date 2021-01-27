import { useEffect, useRef } from 'react'

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
