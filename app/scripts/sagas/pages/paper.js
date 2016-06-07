import {put, call, fork} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

import {api} from '../../services'
import {paper as actions} from '../../actions'

function * loadPaper (args) {
  console.log(args)
  yield put(actions.paper.load.request())

  try {
    const response = yield api.get(args.id)
    yield put(actions.paper.load.success(response))
  } catch (err) {
    yield put(actions.paper.load.failure(err.message))
  }
}

export function * watchLoadPaper () {
  yield takeLatest(actions.PAPER.START_LOAD, loadPaper)
}

export function * load () {
  yield fork(watchLoadPaper)
}
