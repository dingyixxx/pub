import React,{useEffect,useState} from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import { Layout, Menu, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function TopHeader(props) {
  const navi=useNavigate()
  const dispatch=useDispatch()
  const isCollapsed=useSelector(state=>{return state?.handleCollapseReducer.isCollapsed})
  const location=useLocation()
  const [username, setusername] = useState('')
  const [rolename, setrolename] = useState('')
  useEffect(() => {
    const {username,role:{roleName}}=JSON.parse(localStorage.getItem('token'))
    setusername(username)
    setrolename(roleName)
  }, [])
  
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const items = [
        {
          key: '1',
          label: 
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              {rolename}
            </a>
          ,
        },
       
        {
          key: '2',
          label: <span style={{color:'red'}} onClick={()=>{
            localStorage.removeItem('token')
            navi('/login')
          }}>退出登录</span>}]
  return (
    <Header style={{ padding: '0px 24px', background: colorBgContainer }}>
    {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => dispatch({type:'handleCollapse'}),
    })}
    <div style={{float:'right'}}> 
    <span style={{marginRight:'16px'}}>欢迎<span style={{color:'skyblue'}}>{username}</span>回来</span>
    <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      <Avatar size={32} icon={<UserOutlined />} />
      </Space>
    </a>
  </Dropdown>
    </div>
  </Header>
  )
}
