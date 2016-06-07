import {action, createRequestTypes} from './utils'

export const UPLOAD = {
  SET_TITLE: 'SET_TITLE',
  SET_AUTHOR: 'SET_AUTHOR',
  SET_PAPER: 'SET_PAPER',
  RESET_FORM: 'RESET_FORM',
  SUBMIT_FORM: 'SUBMIT_FORM',
  STORE: createRequestTypes('STORE')
}

export const upload = {
  setAuthor: (author) => action(UPLOAD.SET_AUTHOR, {response: author}),
  setTitle: (title) => action(UPLOAD.SET_TITLE, {response: title}),
  setPaper: (paper) => action(UPLOAD.SET_PAPER, {response: paper}),
  resetForm: () => action(UPLOAD.RESET_FORM),
  submitForm: () => action(UPLOAD.SUBMIT_FORM),
  store: {
    request: () => action(UPLOAD.STORE.REQUEST),
    success: (response) => action(UPLOAD.STORE.SUCCESS, {response}),
    failure: (error) => action(UPLOAD.STORE.FAILURE, {error})
  }
}
