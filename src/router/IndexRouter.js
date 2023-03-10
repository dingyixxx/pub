import React,{useEffect} from 'react'
import {HashRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'
import { useLocation } from 'react-router-dom'
import NewsRouter from '../components/sandBox/NewsRouter'
import Home from '../views/sandbox/home/Home'
import UserList from '../views/sandbox/user-manage/UserList'
import RightList from '../views/sandbox/right-manage/RightList'
import RoleList from '../views/sandbox/right-manage/RoleList'
import Audit from '../views/sandbox/audit-manage/Audit'
import AuditList from '../views/sandbox/audit-manage/AuditList'
import Published from '../views/sandbox/publish-manage/Published'
import Unpublished from '../views/sandbox/publish-manage/Unpublished'
import Sunset from '../views/sandbox/publish-manage/Sunset'
import { BrowserRouter } from 'react-router-dom'
import News from '../views/news/News'
import Detail from '../views/news/Detail'
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
  // const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
  return (
    <HashRouter>
        <Routes>
        <Route path='/news' element={<News></News>}></Route>
        <Route path='/detail/:id' element={<Detail></Detail>}></Route>
        <Route path='/login' element={<AuthCom><Login></Login></AuthCom>}></Route>
        <Route path='*'  element={<AuthCom><NewsSandBox ></NewsSandBox></AuthCom>}></Route>
        <Route path='/' element={<Redirect to='/home'></Redirect>}></Route>
        </Routes>
    </HashRouter>
  )
}


// NProgress.start()
// useEffect(() => {
//   NProgress.done()
// }, []);