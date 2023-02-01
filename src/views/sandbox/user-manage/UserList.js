import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,Tree } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;


export default function UserList() {
  const [dataSource, setdataSource] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
  
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => { initdata() }, []);

  const showModal = (record) => { setisModalOpen(true); };
   const  handleOk = async () => {
    setConfirmLoading(true);
  //  await axios.patch("http://127.0.0.1:5000/roles/" + roleId,{
  //     rights:checkedKeys
  //   })
    await initdata()
    setConfirmLoading(false);
    setisModalOpen(false);
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
      title: "确认要删除角色吗?",
      icon: <ExclamationCircleFilled />,
      content: "删除后不可恢复",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        axios
            .delete("http://127.0.0.1:5000/roles/" + record.id)
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
      title: "区域",
      dataIndex: "region",
      key: "id",
      render: (text) => <span>{text===""?"全球":text}</span>,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
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
            <Button disabled={record.default} danger shape="circle" onClick={() => { showConfirm(record); }} icon={<DeleteOutlined />}  />
            <Button disabled={record.default} type="primary"shape="circle" onClick={()=> {showModal(record)}} icon={<EditOutlined />}/>
            <Modal title="角色设置权限" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}   okText="确定"
      cancelText="取消" confirmLoading={confirmLoading}>
              
            </Modal>
        </Space>
      ),
    },
  ];
  return (
    <Table
    rowKey='id'
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 4 }}
    />
  )
}
