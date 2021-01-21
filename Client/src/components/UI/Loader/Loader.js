import React from 'react'
import './Loader.css'
import { connect } from 'react-redux'

const Loader = ({ isLoading }) => {
  const showLoader = () => {
    const show = isLoading.find(state => {
      return state === true
    });
    if (show)
      return <span className="loader"></span>
    else
      return null
  }

  return showLoader()
}

const mapStateToProps = state => {
  return {
    isLoading: [
      state.auth.request,
      state.posts.requestPosts,
      state.user.requestDetails,
      state.user.requestUpdateDetails,
      state.posts.requestCreatePost,
      state.posts.requestDeletePost,
      state.posts.requestUpdatePost
    ]
  }
}

export default connect(mapStateToProps)(Loader)