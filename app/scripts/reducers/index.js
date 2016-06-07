import {combineReducers} from 'redux'
import {reducer as toastr} from 'react-redux-toastr'
import {routerReducer} from 'react-router-redux'

import errors from './errors'
import feed from './feed'
import upload from './upload'
import paper from './paper'

const rootReducer = combineReducers({
  feed,
  upload,
  errors,
  paper,
  toastr,
  routing: routerReducer
})

export default rootReducer
