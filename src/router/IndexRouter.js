import React,{useEffect} from 'react'
import {HashRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import NoPermission from '../views/sandbox/noPermission/NoPermission'
import Home from '../views/sandbox/home/Home'
import UserList from '../views/sandbox/user-manage/UserList'
import RightList from '../views/sandbox/right-manage/RightList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import { useLocation } from 'react-router-dom'

export function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

function AuthCom(props) {
  const location=useLocation()
  const navi=useNavigate()
  if(localStorage.getItem('token')){
    if(location.pathname==="/login"){ return navi(-1) }else{ return props.children }
  }else{
    return <Login></Login>
  }
}

export default function IndexRouter() {
  return (
    <HashRouter>
        <Routes>
        <Route path='/login' element={<AuthCom><Login></Login></AuthCom>}></Route>
        <Route path='/'  element={<AuthCom><NewsSandBox ></NewsSandBox></AuthCom>} >
        <Route path='/'  element={<Redirect to='/home'></Redirect>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/user-manage/list' element={<UserList></UserList>}></Route>
            <Route path='/right-manage/right/list' element={<RightList></RightList>}></Route>
            <Route path='/right-manage/role/list' element={<RoleList></RoleList>}></Route>
            <Route path='*'  element={<NoPermission></NoPermission>}></Route>
        </Route>
        </Routes>
    </HashRouter>
  )
}
