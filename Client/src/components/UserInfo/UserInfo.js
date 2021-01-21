import './UserInfo.css'
import React, { useEffect, useState } from 'react'
import { authService, userService } from '../../services'

const UserInfo = ({ author }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    authService.refreshToken()
    const inf = userService.getOtherUserDetails(author)
    inf.then(res => setInfo(res))
  }, [author])

  return (
    <main className="user-info-container">
      {
        info &&
        <section className="info">
          <img src={userService.getUserProfileImage(author)} alt="" />
          <div className="flex-column">
            <span>{author}</span>
            <span>{info.firstName}&nbsp;{info.lastName}</span>
          </div>
        </section>
      }
    </main>
  )
}

export default UserInfo

