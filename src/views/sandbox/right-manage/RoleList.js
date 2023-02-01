import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,Tree } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setdataSource] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeData, settreeData] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [roleId, setroleId] = useState('')
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };
  
  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };
  useEffect(() => { initdata() }, []);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/rights?_embed=children").then(res=>{
      settreeData(res.data)
    })
  }, []);
  const showModal = (record) => {
    setisModalOpen(true);
  };
   const  handleOk = async () => {
    setConfirmLoading(true);
   await axios.patch("http://127.0.0.1:5000/roles/" + roleId,{
      rights:checkedKeys
    })
    await initdata()
    setConfirmLoading(false);
    setisModalOpen(false);
  };
  const handleCancel = () => {
    setisModalOpen(false);
  };
  function initdata(params) {
    axios.get("http://127.0.0.1:5000/roles").then(res=>{
      setdataSource(res.data)
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
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "角色类型",
      dataIndex: "roleType",
      key: "roleType",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
            <Button danger shape="circle" onClick={() => { showConfirm(record); }} icon={<DeleteOutlined />}  />
            <Button type="primary"shape="circle" onClick={()=> {showModal(record);setCheckedKeys(record.rights);setroleId(record.id)}} icon={<EditOutlined />}/>
            <Modal title="角色设置权限" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}   okText="确定"
      cancelText="取消" confirmLoading={confirmLoading}>
               <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
               />
            </Modal>
        </Space>
      ),
    },
  ];


  return (
    <Table
    rowKey='roleType'
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 4 }}
    />
  )
}
