import { options, API_URL } from '../helpers/options'
import { authentication as auth } from '../helpers/authentication'

const login = async (username, password) => {
  try {
    const loginRequest = { username, password }
    const loginResponse = await fetch(`${API_URL}auth/login`,
      options.basicIncBody('POST', JSON.stringify(loginRequest)))
    let data
    if (loginResponse.ok) {
      data = await loginResponse.json();
      if (data) {
        localStorage.setItem('jwt', JSON.stringify(data.authenticationToken))
        localStorage.setItem('jwtExpiration', JSON.stringify(data.expirationTime))
        localStorage.setItem('user', JSON.stringify(data.username))
        localStorage.setItem('refresh-token', JSON.stringify(data.refreshToken))
        return data.username
      }
    }
    // error message
    data = await loginResponse.text()
    return data
  } catch (error) {
    return 'Invalid username / password'
  }
}

const logout = async () => {
  const logoutRequest = {
    token: auth.getRefreshToken(),
    username: auth.getUser()
  }
  await fetch(`${API_URL}auth/logout`,
    options.basicIncBody('POST', JSON.stringify(logoutRequest)))
  localStorage.clear()
}

const refreshToken = async () => {
  if (!auth.getRefreshToken() || !auth.getUser() || !auth.getJwtExpirationTime())
    return 'Authentication error'
  if (!auth.isJwtExpired())
    return

  const error = 'An error has occurred'
  try {
    const refreshTokenRequest = {
      token: auth.getRefreshToken(),
      username: auth.getUser()
    }
    const refreshTokenResponse = await fetch(`${API_URL}auth/refresh-token`,
      options.basicIncBody('POST', JSON.stringify(refreshTokenRequest)))
    let data
    if (refreshTokenResponse.ok) {
      data = await refreshTokenResponse.json()
      if (data) {
        localStorage.setItem('jwt', JSON.stringify(data.authenticationToken))
        localStorage.setItem('jwtExpiration', JSON.stringify(data.expirationTime))
        localStorage.setItem('user', JSON.stringify(data.username))
        localStorage.setItem('refresh-token', JSON.stringify(data.refreshToken))
        return data.username
      }
    }
    data = await refreshTokenResponse.text()
    return data
  } catch (e) {
    return error
  }
}

const registerAccount = async signupRequest => {
  const signupResponse = await fetch(`${API_URL}auth/signup`,
    options.basicIncBody('POST', JSON.stringify(signupRequest)))
  const data = await signupResponse.text()
  return data
}

const verifyAccount = async token => {
  const verifyAccountResponse = await fetch(`${API_URL}auth/accountverification/${token}`,
    options.basic('GET'))
  const data = await verifyAccountResponse.text()
  return data
}

export const authService = {
  login,
  logout,
  refreshToken,
  registerAccount,
  verifyAccount
}