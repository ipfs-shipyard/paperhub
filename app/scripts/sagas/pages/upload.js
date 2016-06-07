import {put, call, select, fork} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

import {upload as actions, router} from '../../actions'
import {api} from '../../services'

export function * submit () {
  yield put(actions.upload.store.request())

  try {
    const state = yield select()
    yield api.store(state.upload)
    yield put(actions.upload.store.success())
  } catch (err) {
    console.error(err)
    yield put(actions.upload.store.failure(err.message))
  }

  yield put(router.push('/home'))
}

export function * watchSubmit () {
  yield * takeLatest(actions.UPLOAD.SUBMIT_FORM, submit)
}

export function * load () {
  yield fork(watchSubmit)
}
