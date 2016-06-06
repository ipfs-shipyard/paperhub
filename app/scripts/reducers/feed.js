import {includes} from 'lodash-es'
import {home as actions} from '../actions'

const defaultState = {
  list: []
}

function format (list) {
  return list
    .filter((item) => item.payload.op === 'ADD')
    .map((item) => {
      let res

      try {
        res = JSON.parse(item.payload.value)
      } catch (err) {
        res = {}
      }

      res.hash = item.hash
      res.timestamp = item.payload.meta.ts

      return res
    })
    .sort((a, b) => a.timestamp < b.timestamp)
}

export default function errors (state = defaultState, action) {
  const {type, response} = action

  if (includes(actions.FEED, type) && response) {
    return {
      ...state,
      list: format(response)
    }
  }

  return state
}
