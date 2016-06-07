import {paper} from '../actions'
const actions = paper.PAPER

const defaultState = {}

export default function errors (state = defaultState, action) {
  const {type} = action

  if (type === actions.LOAD.SUCCESS) {
    const {response} = action
    return {
      ...state,
      [response.key]: {
        page: 1,
        ...state[response.key],
        content: response.result
      }
    }
  } else if (type === actions.NEXT_PAGE) {
    const {hash} = action
    return {
      ...state,
      [hash]: {...state[hash], page: state[hash].page + 1}
    }
  } else if (type === actions.PREV_PAGE) {
    const {hash} = action
    return {
      ...state,
      [hash]: {...state[hash], page: Math.max(1, state[hash].page - 1)}
    }
  }

  return state
}
