import {put, call, fork, cancel, select} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

import {api} from '../../services'
import {paper as actions} from '../../actions'
import {handleEvent, events} from '../../utils/saga-helpers'

export function * listenData () {
  const emitter = yield call(api.events)
  const syncedChan = yield call(events, 'synced', emitter)
  const dataChan = yield call(events, 'data', emitter)

  yield fork(handleEvent, syncedChan, loadPaper)
  yield fork(handleEvent, dataChan, loadPaper)

  yield call(loadPaper)
}

function * loadPaper (args) {
  let id
  if (args) {
    id = args.id
  } else {
    const state = yield select()
    id = state.paper.selected
  }

  if (!id) return

  yield put(actions.paper.load.request())

  try {
    const response = yield api.get(id)
    yield put(actions.paper.load.success(response))
  } catch (err) {
    yield put(actions.paper.load.failure(err.message))
  }
}

let dataListener

export function * load () {
  dataListener = yield fork(listenData)
}

export function * leave () {
  yield cancel(dataListener)
}
