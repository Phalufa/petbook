import { authActionTypes } from '../actions/actionTypes/index'

const initialState = {
  error: null,
  signup: {},
  response: null,
  signed: false
}

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.REGISTER_REQUEST:
      return { ...state, signup: action.payload.signup }
    case authActionTypes.REGISTER_SUCCESS:
      return {
        response: action.payload.response,
        signed: action.payload.signed,
        verified: action.payload.varified,
        error: null
      }
    case authActionTypes.REGISTER_FAILED:
      return { ...state, ...action.error }
    case authActionTypes.VERIFY_ACCOUNT_REQUEST:
      return { ...state, verificationToken: action.payload.verificationToken }
    case authActionTypes.VERIFY_ACCOUNT_SUCCESS:
      return { ...state, verified: true }
    case authActionTypes.VERIFY_ACCOUNT_FAILED:
      return { ...state, ...action.error }
    default:
      return state
  }
}