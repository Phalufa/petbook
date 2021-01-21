import { userActionTypes } from '../actions/actionTypes/index'
import { authentication as auth } from '../../helpers/authentication'

const initialState = {
  username: auth.getUser() ? auth.getUser() : null,
  firstName: null,
  lastName: null,
  id: null,
  email: null,
  image: null,
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.GET_USER_DETAILS_REQUEST:
      return { ...state, requestDetails: true, error: '' }
    case userActionTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        username: auth.getUser(),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        id: action.payload.id,
        image: action.payload.image,
        requestDetails: false,
        error: null
      }
    case userActionTypes.GET_USER_DETAILS_FAILED:
      return { ...action.error, requestDetails: false }
    case userActionTypes.UPDATE_USER_DETAILS_REQUEST:
      return { ...state, requestUpdateDetails: true, error: '' }
    case userActionTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        username: auth.getUser(),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        id: action.payload.id,
        image: action.payload.image,
        requestUpdateDetails: false,
        error: null
      }
    case userActionTypes.UPDATE_USER_DETAILS_FAILED:
      return { ...state, requestUpdateDetails: false, error: action.error.error }
    default:
      return state
  }
}