import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import getRoutesReducer from './getRoutesReducer'
import handleCollapseReducer from './handleCollapseReducer'
import loadingReducer from './loadingReducer'
import createSagaMiddleWare from  'redux-saga'
import watchSaga from './saga'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const sagaMiddleWare=createSagaMiddleWare()

const persistConfig={
    key:'root',
    storage,
    whitelist:['loadingReducer','handleCollapseReducer']
}

const loadingPersistConfig={ key:'loadingReducer', storage }
const handleCollapsePersistConfig={ key:'handleCollapseReducer', storage }

const allReducers=combineReducers(
    {
        handleCollapseReducer:persistReducer(handleCollapsePersistConfig,handleCollapseReducer),
        getRoutesReducer,
        loadingReducer:persistReducer(loadingPersistConfig,loadingReducer)
    })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const enhancer=composeEnhancers(applyMiddleware(sagaMiddleWare))
const _persistReducer=persistReducer(persistConfig, allReducers)
let store= createStore(_persistReducer,enhancer)
let persistor=persistStore(store)
sagaMiddleWare.run(watchSaga)


export  {persistor,store}
