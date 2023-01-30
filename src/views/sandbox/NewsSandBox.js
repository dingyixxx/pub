import React,{useState} from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import SideMenu from '../../components/sandBox/SideMenu'
import TopHeader from '../../components/sandBox/TopHeader'
import NoPermission from '../sandbox/noPermission/NoPermission'
import { Layout, Menu, theme } from 'antd';
import './NewsSandBox.scss'
const { Header, Sider, Content } = Layout;
export default function NewsSandBox(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SideMenu collapsed={collapsed} setCollapsed={setCollapsed}></SideMenu>
      <Layout className="site-layout">
      <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} ></TopHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
                <Outlet ></Outlet>
        </Content>
      </Layout>


    </Layout>
  )
}
