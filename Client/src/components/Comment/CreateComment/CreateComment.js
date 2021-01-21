import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { commentActions } from '../../../store/actions'
import './CreateComment.css'
import { authentication as auth } from '../../../helpers/authentication'

const CreateComment = ({ addComment, postId, onCommentAdded }) => {
  const [showCommentButton, setShowCommentButton] = useState(false)
  const [cancel, setCancel] = useState(false)
  const commentInput = useRef(null)

  const onSubmitComment = (e) => {
    e.preventDefault()
    let content = commentInput.current.value
    if (content) {
      content = content.trim()
      const commentRequest = {
        id: null,
        postId,
        username: auth.getUser(),
        content,
        timeCreated: null
      }
      addComment(commentRequest)
      onCommentAdded()
      cancelComment(e)
    }

  }

  const handleShowButton = e => {
    setShowCommentButton(true)
    setCancel(false)
  }

  const handleHideButton = e => {
    if (!e.target.value)
      setShowCommentButton(false)

    if (cancel)
      e.target.value = ''
  }

  const cancelComment = (e) => {
    e.preventDefault()
    setCancel(true)
    setShowCommentButton(false)
    commentInput.current.value = ''
  }

  return (
    <section className="CreateComment">
      <form>
        <textarea
          placeholder="&#10551; Share your thoughts..."
          onFocus={(e) => handleShowButton(e)}
          onBlur={(e) => handleHideButton(e)}
          ref={commentInput}></textarea>
        {showCommentButton ?
          <div className="options">
            <button
              onClick={(e) => cancelComment(e)}
              className="Button">cancel</button>
            <button
              type="submit"
              onClick={onSubmitComment}
              className="Button FilledButton no-margin">comment</button>
          </div>
          : null}
      </form>
    </section>
  )
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = {
  addComment: commentActions.createComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment)