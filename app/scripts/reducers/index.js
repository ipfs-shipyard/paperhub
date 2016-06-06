import {combineReducers} from 'redux'
import {reducer as toastr} from 'react-redux-toastr'
import {routerReducer} from 'react-router-redux'

import errors from './errors'
import upload from './upload'

const rootReducer = combineReducers({
  upload,
  errors,
  toastr,
  routing: routerReducer
})

export default rootReducer
