import React,{useState,useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import SideMenu from '../../components/sandBox/SideMenu'
import TopHeader from '../../components/sandBox/TopHeader'
import NoPermission from '../sandbox/noPermission/NoPermission'
import NewsRouter from '../../components/sandBox/NewsRouter'
import { Layout, Menu, theme,notification } from 'antd';
import './NewsSandBox.scss'
import { Outlet } from 'react-router-dom'
import Http from '../../util/http'

import Redirect from '../../router/IndexRouter'
import { Spin } from 'antd';
import {  useDispatch, useSelector } from "react-redux";
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
const { Header, Sider, Content } = Layout;
export default function NewsSandBox(props) {

  const [api, contextHolder] = notification.useNotification();
  const isLoading=useSelector(state=>state.loadingReducer.isLoading)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
    {contextHolder}
    <Layout>
      <SideMenu ></SideMenu>
      <Layout className="site-layout">
      <TopHeader  ></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            flex:1,
            overflowY:'scroll'
          }}
        >
    <Spin spinning={isLoading} style={{position:'fixed',left:'50vw',top:'50vh'}}/>
        
                    <NewsRouter></NewsRouter> 

        </Content>
      </Layout>


    </Layout></>
  )
}
