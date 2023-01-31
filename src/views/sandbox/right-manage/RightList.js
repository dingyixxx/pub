import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Space, Table, Tag,Button, Modal} from 'antd';
import {
  DeleteOutlined,EditOutlined
} from '@ant-design/icons';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;
function handleRightTreeData(data) {
  return data.map(item=>{
    if(item.children){
      if(item.children.length>0){
        item.children=handleRightTreeData(item.children)
      }else{
        delete item.children
      }
    }
    return {
      ...item,key:[item.key]
    }
  })
}
export default function RightList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showConfirm = (record) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        axios .delete("http://127.0.0.1:5000/rights/"+record.id).then(res=>{
          console.log(res)
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const [dataSource, setdataSource] = useState([])
  useEffect(() => { axios .get("http://127.0.0.1:5000/rights?_embed=children") .then((res) => {
  setdataSource(handleRightTreeData(res.data))}) }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    
    {
      title: '权限路径',
      key: 'key',
      dataIndex: 'key',
      render: (_, { key }) => (
        <>
        
          {
       
       key?.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger shape="circle" onClick={()=>{
          showConfirm(record)
          }} icon={<DeleteOutlined />} />
          <Button  type="primary"  shape="circle" icon={<EditOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />

    </div>
  )
}
