import {take,fork,call,put} from 'redux-saga/effects'
import axios from 'axios'
export default function *watchSaga(){
    while(true){
        yield take('getRoutes')
        yield fork(getRoutesData)
    }

}

function *getRoutesData(params) {
    let result=yield call( ()=>{
       return  axios.get("/rights?_embed=children").then(res=>{
        return res.data
    })
    })
    yield put({
        type:'updateRoutes',
        payload:result
    })
}