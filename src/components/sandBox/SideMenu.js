import React,{useState,useEffect} from 'react'
import { Layout, Menu, theme } from 'antd';
import axios from 'axios'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { MailOutlined, SettingOutlined,AppstoreOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  function handleData(data) {
    return data.map(item=>{
        const {key,title,children}=item
        if(children&&children.length>0){item.children=handleData(children)}
        if(children&&children.length===0){delete item.children}
        return getItem(title,key,<UserOutlined></UserOutlined>,item.children)
    })
  }


export default function SideMenu(props) {
    const [items, setitems] = useState([])
    const navi=useNavigate()
    const location=useLocation()
    const [defaultSelectedKeys, setdefaultSelectedKeys] = useState([location.pathname])
    const [defaultOpenKeys, setdefaultOpenKeys] = useState([])
   
    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then(res=>setitems(handleData(res.data)))
       
    }, [])
    useEffect(() => {
        axios.get('http://localhost:5000/children?_expand=right').then(res=>{
            setdefaultOpenKeys([res.data.filter(item=>{
                return item.key===location.pathname
            })[0].right.key])
        })
    }, [])
    
  
    
  return (
    <Sider  collapsible collapsed={props.collapsed}>
        <div style={{display:'flex',flexDirection:'column',flex:1,height:'100%',flexBasis:'100%'}}>

        <div className="logo" >小干拌</div>
        <Menu
        style={{flex:1,overflowY:'auto'}}
          theme="dark"
          mode="inline"
          items={items}
          onClick={e=>{
            navi(e.key)}}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
        />
        </div>

      </Sider>
  )
}
