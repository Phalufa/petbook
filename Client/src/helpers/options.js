import { authentication } from './authentication'

// app's api url
export const API_URL = `${process.env.REACT_APP_API_URL}`

// app's requests headers
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// app's requests headers including authentication
const headersIncAuth = () => {
  return {
    ...headers,
    'Authorization': `Bearer ${authentication.getJwt()}`
  }
}

// app's requests options
const basic = method => {
  return {
    method: method,
    headers
  }
}

// app's requests options including request body
const basicIncBody = (method, body) => {
  return {
    method: method,
    headers,
    body: body
  }
}

// app's requests options including authentication
const advancedIncAuth = method => {
  const headers = headersIncAuth()
  return {
    method: method,
    headers
  }
}

// app's requests options including authentication and request body
const advancedIncAuthAndBody = (method, body) => {
  const headers = headersIncAuth()
  return {
    method: method,
    headers,
    body: body
  }
}

// app's requests options for multipart files
const multipartOptions = {}

export const options = {
  basic,
  basicIncBody,
  advancedIncAuth,
  advancedIncAuthAndBody,
  multipartOptions
}