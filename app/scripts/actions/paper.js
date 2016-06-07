import {action, createRequestTypes} from './utils'

export const PAPER = {
  LOAD: createRequestTypes('LOAD'),
  NEXT_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE',
  SELECT: 'SELECT',
  DESELECT: 'DESELECT'
}

export const paper = {
  nextPage: (hash) => action(PAPER.NEXT_PAGE, {hash}),
  prevPage: (hash) => action(PAPER.PREV_PAGE, {hash}),
  select: (hash) => action(PAPER.SELECT, {hash}),
  deselect : () => action(PAPER.DESELECT),
  load: {
    request: () => action(PAPER.LOAD.REQUEST),
    success: (response) => action(PAPER.LOAD.SUCCESS, {response}),
    failure: (error) => action(PAPER.LOAD.FAILURE, {error})
  }
}
