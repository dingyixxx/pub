import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,Form, Input} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import UserForm from '../../../components/UserForm'
const { confirm } = Modal;


export default function UserList() {
  const userInfoForm=useRef()
  const [formMode, setformMode] = useState('')
  const [dataSource, setdataSource] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
  const [currentUserId, setcurrentUserId] = useState('')
  const [currentUserInfo, setcurrentUserInfo] = useState({})
  const [modalTitle, setmodalTitle] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [roleOptions, setroleOptions] = useState([])
  const [regionOptions, setregionOptions] = useState([])
  const [regionIsDisabled, setregionIsDisabled] = useState(false)
  useEffect(() => { axios.get('http://127.0.0.1:5000/regions').then(res=>setregionOptions(res.data)) }, []);
  useEffect(() => { axios.get('http://127.0.0.1:5000/roles').then(res=>setroleOptions(res.data.map(item=>{
    return {...item,value:item.id,label:item.roleName}
  })) )}, []);
  useEffect(() => { initdata() }, []);

  const showModal = (value,record) => { 
    setformMode(value)
    setisModalOpen(true);
    setTimeout(()=>{
      if(value==='add'){
        setmodalTitle('新增用户')
  
        userInfoForm.current.resetFields()
      }else{
        console.log(record)
        setcurrentUserId(record.id)
        setcurrentUserInfo(record)
       
        setmodalTitle('编辑用户')
        userInfoForm.current.setFieldsValue(JSON.parse(JSON.stringify(record)))
      }
    },0)
     };

  
  const handleCancel = () => {
    setisModalOpen(false);
  };
  function initdata(params) {
    axios.get("http://127.0.0.1:5000/users?_expand=role").then(res=>{
      const {roleId,username,region}=JSON.parse(localStorage.getItem('token'))
      const userList=res.data.filter(item=>{
        if(roleId===2){
          return item.username===username||(item.roleId===3 && item.region===region)
        }else if(roleId===1){
          return true
        }else{
          return item.username===username
        }
      })
      setdataSource(userList.map(item=>{return {...item,roleName:item.role.roleName}}))
 })
  }
  const showConfirm = (record) => {
    confirm({
      title: "确认要删除用户吗?",
      icon: <ExclamationCircleFilled />,
      content: "删除后不可恢复",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        axios
            .delete("http://127.0.0.1:5000/users/" + record.id)
            .then((res) => {
              initdata()
            });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const checkRegionIsDisabled=(_roleId)=>{
    const {roleId,region}=JSON.parse(localStorage.getItem('token'))
    if(formMode==='add'){
      if(roleId===1){ return false }else{ return _roleId !==1 }
    }else{
      if(roleId===1){ return false }else{ return true }
    }
  }

  const checkRoleIdIsDisabled=(_roleId)=>{
    const {roleId,region}=JSON.parse(localStorage.getItem('token'))
    if(formMode==='add'){
      if(roleId===1){ return false }else{ return _roleId !==3 }
    }else{
      if(roleId===1){ return false }else{ return _roleId !==3}
    }
  }

  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      fixed: 'left',
      width: 150,
    },
      {
      title: "密码",
      dataIndex: "password",
      key: "password",
      width: 150,
    },
      {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      width: 200,
      render: (text) => {
        if(text==="区域管理员"){return  <Tag color='geekblue' >{text}</Tag>}
        if(text==="超级管理员"){return  <Tag color='volcano' >{text}</Tag>}
        if(text==="区域编辑"){return  <Tag color='green' >{text}</Tag>}
      },
    },
    {
      title: "区域",
      dataIndex: "region",
      key: "region",
      width: 100,
      render: (text) => <span>{text===""?"全球":text}</span>,
      filters:regionOptions.map(item=>{return {...item,text:item.value}}).concat([{text:"全球",value:""}]),
      onFilter: (value, record) => record.region === value
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      width: 200,
      render:(state,record)=>{return <Switch disabled={record.default} checked={record.roleState} onChange={checked=>{
        axios
        .patch("http://127.0.0.1:5000/users/" + record.id,{roleState:checked})
        .then((res) => {
          initdata()
        });
        }} />}
    },
    // {
    //   title: "权限",
    //   dataIndex: "role",
    //   key: "role",
    //   width: 600,
    //   render: (value) => <ul className="role-cell">{value.rights.map(item=><li key={item}>{item}</li>)}</ul>,
    // },
    {
      title: "操作",
      key: "action",
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
            <Button disabled={record.default} danger shape="circle" onClick={() => { showConfirm(record) }} icon={<DeleteOutlined />}  />
            <Button disabled={record.default} type="primary"shape="circle" onClick={()=> {showModal('update',record)}} icon={<EditOutlined />}/>
        </Space>
      ),
    },
  ];
  return (
   <div>
     <Button type="primary" onClick={()=>{showModal('add')}} style={{marginBottom:'16px'}}>新增用户</Button>
     <Modal
      open={isModalOpen}
      title={modalTitle}
      okText="确定"
      cancelText="取消" 
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      onOk={async () => {
      const values=await  userInfoForm.current.validateFields()
      setConfirmLoading(true);
      if(formMode==='add'){ 
        await axios.post("http://127.0.0.1:5000/users",{...values, "roleState": true, "default": false,})
      }else{ await axios.patch("http://127.0.0.1:5000/users/"+currentUserId,{...currentUserInfo,...values})}
      await initdata()
      setConfirmLoading(false);
      setisModalOpen(false);
      }}
    >
     <UserForm ref={userInfoForm} roleOptions={roleOptions} regionOptions={regionOptions} regionIsDisabled={regionIsDisabled} setregionIsDisabled={setregionIsDisabled} checkRegionIsDisabled={checkRegionIsDisabled} checkRoleIdIsDisabled={checkRoleIdIsDisabled} ></UserForm>
    </Modal>
     <Table
    rowKey='id'
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 12 }}
      scroll={{
        x: 1500,
      }}
    />
   </div>
  )
}
