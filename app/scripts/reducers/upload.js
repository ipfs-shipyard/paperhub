import {upload} from '../actions'
const actions = upload.UPLOAD

const defaultState = {
  title: '',
  author: '',
  paper: null
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
  } else if (type === actions.SET_PAPER) {
    return {
      ...state,
      title: state.title || response.path,
      paper: response
    }
  } else if (type === actions.RESET_FORM) {
    return defaultState
  } else if (type === actions.STORE.SUCCESS) {
    return defaultState
  }

  return state
}
