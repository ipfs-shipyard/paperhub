import {fork} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'

import {pages} from '../../actions'

import * as home from './home'
import * as upload from './upload'
import * as paper from './paper'

const loaders = {
  home,
  upload,
  paper
}

export default function * watchPages () {
  yield Object.keys(loaders)
    .reduce((acc, name) => {
      const loader = loaders[name]

      if (loader.load) {
        acc.push(fork(function * () {
          yield * takeLatest(pages[name.toUpperCase()].LOAD, loader.load)
        }))
      }

      if (loader.leave) {
        acc.push(fork(function * () {
          yield * takeLatest(pages[name.toUpperCase()].LEAVE, loader.leave)
        }))
      }

      return acc
    }, [])
}
