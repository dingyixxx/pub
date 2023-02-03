import React, { useState, useEffect,useMemo } from "react";
import { connect } from "react-redux";
import getRoutesAction from '../../react-redux/getRoutesAction'
import store from '../../react-redux/store'
import axios from "axios";
import { Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
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
function handleData(data,arr) {
  let _arr=arr
  return data.filter(item=>{return item.pagepermisson ===1 && _arr.includes(item.key)}).map((item) => {
    const { key, title } = item;
    let children=item.children?.filter(item=>{return item.pagepermisson ===1})
    if (children===null||children===undefined) { delete item.children; }
    if (children && children.length > 0) { item.children = handleData(children,_arr); }
    if (children && children.length === 0) { delete item.children; }
    return getItem(title, key, <UserOutlined></UserOutlined>, item.children);
  });
}



function SideMenu(props) {
  
  const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
  let items=handleData(JSON.parse(JSON.stringify(props.routesRawData)),rights)

 
  

  const navi = useNavigate();
  const location = useLocation();
  const [selectedKeys, setselectedKeys] = useState([location.pathname]);
  const [openKeys, setopenKeys] = useState([]);
  useEffect(() => {
    if(props.routesRawData.length===0){
        props.dispatch(getRoutesAction())
    }}, [props]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/children?_expand=right").then((res) => { setopenKeys([ res.data.filter((item) => { return item.key === location.pathname; })[0]?.right.key, ]); });
  }, []);
  return (
    <Sider collapsible collapsed={props.collapsed} onCollapse={(value) => props.setCollapsed(value)}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%", flexBasis: "100%", }} >
        <div className="logo">小干拌</div>
        <Menu
          style={{ flex: 1, overflowY: "auto" }}
          theme="dark"
          mode="inline"
          items={items}
          onClick={(e) => {  navi(e.key); }}
          onSelect={(e) => {  setselectedKeys(e.selectedKeys); }}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          selectable
          onOpenChange={(e) => { setopenKeys(e); }}
        />
      </div>
    </Sider>
  );
}

export default connect(state => {
   return { routesRawData:state.routesRawData}
	})(SideMenu
)
