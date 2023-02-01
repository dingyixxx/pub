import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,Form, Input} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import UserForm from '../../../components/UserForm'
const { confirm } = Modal;


export default function UserList() {
  const userInfoForm=useRef()
  const [dataSource, setdataSource] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
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
  
    setisModalOpen(true);
    setTimeout(()=>{
      if(value==='add'){
        setmodalTitle('新增用户')
        userInfoForm.current.resetFields()
      }else{
        console.log(record)
        if(record.roleId===1){
          setregionIsDisabled(true)
        }else{
          setregionIsDisabled(false)
        }
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
      setdataSource(res.data.map(item=>{return {...item,roleName:item.role.roleName}}))
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
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
      {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "区域",
      dataIndex: "region",
      key: "id",
      render: (text) => <span>{text===""?"全球":text}</span>,
    },

    {
      title: "用户状态",
      dataIndex: "roleState",
      render:(state,record)=>{return <Switch disabled={record.default} checked={record.roleState} onChange={checked=>{
        axios
        .patch("http://127.0.0.1:5000/users/" + record.id,{roleState:checked})
        .then((res) => {
          initdata()
        });
        }} />}
    },
    {
      title: "操作",
      key: "action",
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
      onOk={() => {
        userInfoForm.current.validateFields()
          .then((values) => {
            setConfirmLoading(true);
            axios
            .post("http://127.0.0.1:5000/users",{...values,  
            "roleState": true,
            "default": false,})
            .then(async (res) => {
             await initdata()
             setConfirmLoading(false);
             setisModalOpen(false);
            });
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
     <UserForm ref={userInfoForm} roleOptions={roleOptions} regionOptions={regionOptions} regionIsDisabled={regionIsDisabled}></UserForm>
    </Modal>
     <Table
    rowKey='id'
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 12 }}
    />
   </div>
  )
}
