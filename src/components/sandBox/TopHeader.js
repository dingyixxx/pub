import React from 'react'
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
  const location=useLocation()
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
       
        {
          key: '2',
          label: <span style={{color:'red'}} onClick={()=>{
            localStorage.removeItem('token')
            navi('/login')
          }}>退出登录</span>}]
  return (
    <Header style={{ padding: '0px 24px', background: colorBgContainer }}>
    {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => props.setCollapsed(!props.collapsed),
    })}
    <div style={{float:'right'}}> 
    <span style={{marginRight:'16px'}}>欢迎<span style={{color:'skyblue'}}>admin</span>回来</span>
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
