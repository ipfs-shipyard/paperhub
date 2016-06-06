import {put, call, select, fork} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

import {upload as actions, router} from '../../actions'
import {api} from '../../services'

export function * submit () {
  yield put(actions.upload.store.request())

  try {
    const state = yield select()
    api.store(state.upload)
    yield put(actions.upload.store.success())
    yield put(router.push('/home'))
  } catch (err) {
    yield put(actions.upload.store.failure(err.message))
  }
}

export function * watchSubmit () {
  yield * takeLatest(actions.UPLOAD.SUBMIT_FORM, submit)
}

export function * load () {
  yield fork(watchSubmit)
}
