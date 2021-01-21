import React, { useEffect, useRef } from 'react'
import './EditComment.css'
import { checkRequired } from '../../../utils/validations'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { commentActions } from '../../../store/actions'

const EditComment = ({ comment, updateComment, cancelEdit }) => {
  const refEl = useRef(null)

  useEffect(() => {
    refEl.current.focus()
  }, [])

  const {
    id,
    postId,
    timeCreated,
    content,
    username } = comment

  const validate = values => {
    const errors = {}
    checkRequired(errors, values)
    return errors
  }

  const form = useFormik({
    initialValues: { content },
    validate,
    onSubmit: values => {
      const updateCommentRequest = {
        id,
        postId,
        username,
        content: values.content,
        timeCreated
      }
      updateComment(updateCommentRequest, id)
      cancelEdit()
    }
  })

  return (
    <main className="EditComment">
      <form onSubmit={form.handleSubmit}>
        <textarea
          ref={refEl}
          id="content"
          name="content"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values.content}
          placeholder="Your text"
        />
        {form.touched.content && form.errors.content ?
          <div className="field-error">{form.errors.content}</div>
          : null}
        <div className="options">
          <button
            type="reset"
            onClick={cancelEdit}
            className="Button">cancel</button>
          <button
            type="submit"
            className="Button FilledButton no-margin">save</button>
        </div>
      </form>
    </main>
  )
}

const mapDispatchToProps = {
  updateComment: commentActions.updateComment
}

export default connect(null, mapDispatchToProps)(EditComment)