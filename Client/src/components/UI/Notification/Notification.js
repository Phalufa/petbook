import './Notification.css'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Notification = ({ milliseconds }) => {
	const errorMsg = useSelector(state => state.requests.error)
	const successMsg = useSelector(state => state.requests.message)
	const dispatch = useDispatch()
	const msg = errorMsg || successMsg

	const showMsg = () => {
		return msg ? (
			<>
				<div className="notification">
					{errorMsg && <span className="error">{errorMsg}</span>}
					{successMsg && <span className="success">{successMsg}</span>}
					<button onClick={() => clearMsg(0)} className="Button closeBtn">
						&#10006;
					</button>
				</div>
				{clearMsg()}
			</>
		) : null
	}

	const clearMsg = (millis = milliseconds, msg) => {
		const clear = () => {
			if (errorMsg) dispatch({ type: 'CLEAR_ERROR' })
			if (successMsg) dispatch({ type: 'CLEAR_MESSAGE' })
			clearTimeout(delay)
		}
		const delay = setTimeout(clear, millis)
	}

	return showMsg()
}

export default Notification
