// get Jwt
const getJwt = () => {
  const jwt = localStorage.getItem('jwt')
  return JSON.parse(jwt)
}

// get Jwt expiration time in millis
const getJwtExpirationTime = () => {
  const jwtExpiration = localStorage.getItem('jwtExpiration')
  const expirationTime = JSON.parse(jwtExpiration)
  return new Date(expirationTime).getTime()
}

// check if Jwt has expired
const isJwtExpired = () => {
  const now = new Date().getTime()
  return getJwtExpirationTime() < now
}

// get refresh token
const getRefreshToken = () => {
  const token = localStorage.getItem('refresh-token')
  return JSON.parse(token)
}

// get current user (username)
const getUser = () => {
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}

export const authentication = {
  getJwt,
  getRefreshToken,
  getJwtExpirationTime,
  isJwtExpired,
  getUser
}