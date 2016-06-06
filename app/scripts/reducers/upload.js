import {upload} from '../actions'
const actions = upload.UPLOAD

const defaultState = {
  title: '',
  author: ''
}

export default function errors (state = defaultState, action) {
  const {type, response} = action

  if (type === actions.SET_TITLE) {
    return {
      ...state,
      title: response
    }
  } else if (type === actions.SET_AUTHOR) {
    return {
      ...state,
      author: response
    }
  } else if (type === actions.RESET_FORM) {
    return defaultState
  }

  return state
}
