import { useEffect } from 'react'

export const useNoScroll = () => {
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => (document.body.style.overflow = 'auto')
	}, [])
}
