import React,{useEffect,useState} from 'react';
import axios from 'axios'
import Home from '../../views/sandbox/home/Home'
import UserList from '../../views/sandbox/user-manage/UserList'
import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import {Routes, Route} from 'react-router-dom'
import Redirect from '../../router/IndexRouter'
import NoPermission from '../../views/sandbox/noPermission/NoPermission'
import Audit from '../../views/sandbox/audit-manage/Audit';
import AuditList from '../../views/sandbox/audit-manage/AuditList';
import Published from '../../views/sandbox/publish-manage/Published'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished';
import Sunset from '../../views/sandbox/publish-manage/Sunset'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd';
import NewsList from '../../views/sandbox/news-manage/NewsList';
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft';
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory';
const ROUTES_MAPPING_TABLE={
    '/home':<Home></Home>,
    '/user-manage/list':<UserList></UserList>,
    '/right-manage/right/list':<RightList></RightList>,
    '/right-manage/role/list':<RoleList></RoleList>,
    '/audit-manage/audit':<Audit></Audit>,
    '/audit-manage/list':<AuditList></AuditList>,
    '/publish-manage/published':<Published></Published>,
    '/publish-manage/unpublished':<Unpublished></Unpublished>,
    '/publish-manage/sunset':<Sunset></Sunset>,
    '/news-manage/add':<NewsAdd></NewsAdd>,
    '/news-manage/list':<NewsList></NewsList>,
    '/news-manage/draft':<NewsDraft></NewsDraft>,
    '/news-manage/category':<NewsCategory></NewsCategory>
}


const NewsRouter = () => {
    const [db_rights, setdb_rights] = useState([])
   
    useEffect(() => {
        Promise.all(
        [axios.get("/rights"),
        axios.get("/children")]
        ).then(res=>{
            setdb_rights([...res[0].data,...res[1].data])
        })
    }, [])
    
    const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
    return (
        <Routes>
        { rights.filter(item=>{return (db_rights.filter(dbRight=>{return dbRight.pagepermisson===1})).map(item=>item.key).includes(item)}).map(auth=> <Route path={auth} key={auth} element={ROUTES_MAPPING_TABLE[auth]}></Route>) }
        <Route path='*'  element={<NoPermission></NoPermission>}></Route>
        </Routes>
    );
}

export default NewsRouter;
