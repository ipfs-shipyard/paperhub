import {put, call, fork, cancel} from 'redux-saga/effects'

import {home} from '../../actions'
import {api} from '../../services'
import {handleEvent, events} from '../../utils/saga-helpers'

export function * listenData () {
  const emitter = yield call(api.events)
  const syncedChan = yield call(events, 'synced', emitter)
  const dataChan = yield call(events, 'data', emitter)

  yield fork(handleEvent, syncedChan, fetchFeed)
  yield fork(handleEvent, dataChan, fetchFeed)

  yield call(fetchFeed)
}

export function * fetchFeed () {
  yield put(home.feed.request())
  try {
    const response = yield call(api.feed)
    yield put(home.feed.success(response))
  } catch (err) {
    yield put(home.feed.failure(err.message))
  }
}

let dataListener

export function * load () {
  dataListener = yield fork(listenData)
}

export function * leave () {
  yield cancel(dataListener)
}
