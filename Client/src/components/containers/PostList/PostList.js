import React, { useEffect, useState, useRef, useCallback } from 'react'
import Post from '../../Post/Post'
import './PostList.css'
import { useDispatch, useSelector } from 'react-redux'
import { usePostPagination } from '../../../hooks/index'
import { postActions } from '../../../store/actions'

const PostList = () => {
	const pageNumber = useSelector(state => state.posts.pageNumber)
	const dispatch = useDispatch()

	const [pageCounter, setPageCounter] = useState(pageNumber)
	const { hasEnded, posts } = usePostPagination(pageCounter)

	const ref = useRef()
	const lastElem = useCallback(
		elem => {
			if (ref.current) ref.current.disconnect()
			const options = { threshold: 0.1 }
			ref.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && !hasEnded)
					setPageCounter(prevCounter => prevCounter + 1)
			}, options)
			if (elem) ref.current.observe(elem)
		},
		[hasEnded]
	)

	// reset posts and page counter on each render
	useEffect(() => {
		return () => {
			dispatch(postActions.clearPosts())
			setPageCounter(0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className="PostList">
			{posts &&
				posts.map((post, index) => {
					let {
						postId,
						username,
						userImage,
						title,
						url,
						timeCreated,
						numOfComments,
						content
					} = post

					if (index === posts.length - 1)
						return (
							// reference the last element for pagination
							<span ref={lastElem} key={postId}>
								<Post
									key={postId}
									user={username}
									userImage={userImage}
									title={title}
									url={url}
									date={timeCreated}
									numOfComments={numOfComments}
									content={content}
									id={postId}
								/>
							</span>
						)
					else
						return (
							<Post
								key={postId}
								user={username}
								userImage={userImage}
								title={title}
								url={url}
								date={timeCreated}
								numOfComments={numOfComments}
								content={content}
								id={postId}
							/>
						)
				})}
		</section>
	)
}

export default PostList
