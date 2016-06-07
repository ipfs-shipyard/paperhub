import {action, createRequestTypes} from './utils'

export const PAPER = {
  LOAD: createRequestTypes('LOAD'),
  START_LOAD: 'START_LOAD',
  NEXT_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE'
}

export const paper = {
  startLoad: (id) => action(PAPER.START_LOAD, {id}),
  nextPage: (hash) => action(PAPER.NEXT_PAGE, {hash}),
  prevPage: (hash) => action(PAPER.PREV_PAGE, {hash}),
  load: {
    request: () => action(PAPER.LOAD.REQUEST),
    success: (response) => action(PAPER.LOAD.SUCCESS, {response}),
    failure: (error) => action(PAPER.LOAD.FAILURE, {error})
  }
}
