import {action} from './utils'

export const UPLOAD = {
  SET_TITLE: 'SET_TITLE',
  SET_AUTHOR: 'SET_AUTHOR',
  RESET_FORM: 'RESET_FORM'
}

export const upload = {
  setAuthor: (author) => action(UPLOAD.SET_AUTHOR, {response: author}),
  setTitle: (title) => action(UPLOAD.SET_TITLE, {response: title}),
  resetForm: () => action(UPLOAD.RESET_FORM)
}
