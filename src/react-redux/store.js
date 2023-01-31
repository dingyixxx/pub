import {createStore,applyMiddleware,compose} from 'redux'
import getRoutesReducer from './getRoutesReducer'
import createSagaMiddleWare from  'redux-saga'
import watchSaga from './saga'

const sagaMiddleWare=createSagaMiddleWare()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const enhancer=composeEnhancers(applyMiddleware(sagaMiddleWare))

const store=createStore(getRoutesReducer,enhancer)

sagaMiddleWare.run(watchSaga)
export default store