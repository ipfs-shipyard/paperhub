import {createStore, applyMiddleware} from 'redux'
import {hashHistory} from 'react-router'
import {routerMiddlware} from 'react-router-redux'
import sagaSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const finalCreateStore = applyMiddleware(
  sagaMiddleware,
  routerMiddlware(hashHistory)
)(createStore)

export default function configureStore (initialState) {
  sagaMiddleware.run(rootSaga)
  return finalCreateStore(rootReducer, initialState)
}
