import {put, call, take, fork, cancel, cancelled} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'

import {home} from '../../actions'
import {api} from '../../services'

let listening = false

export function events (name, emitter) {
  let handler

  return eventChannel((listener) => {
    handler = (channel) => {
      console.log('event', name, channel)
      listener(channel)
    }
    console.log('subscribing to %s', name)
    emitter.on(name, handler)

    return () => {
      console.log('closing', name)
      emitter.removeListener(name, handler)
    }
  })
}

export function * handleEvent (chan) {
  console.log('start handling events')
  try {
    while (true) {
      let channel = yield take(chan)
      yield call(fetchFeed)
    }
  } finally {
    if (yield cancelled()) {
      chan.close()
    }
  }
}

export function * listenData () {
  const emitter = yield call(api.events)
  const syncedChan = yield call(events, 'synced', emitter)
  const dataChan = yield call(events, 'data', emitter)

  yield fork(handleEvent, syncedChan)
  yield fork(handleEvent, dataChan)

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
