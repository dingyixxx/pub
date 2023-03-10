import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled ,SendOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;


export default function NewsDraft() {
    const [api, contextHolder] = notification.useNotification();
    const [dataSource, setdataSource] = useState([])
    const [isModalOpen, setisModalOpen] = useState(false)
    const User=JSON.parse(localStorage.getItem('token'))
    const navi=useNavigate()

    const [newsId, setnewsId] = useState('')
 
    useEffect(() => { initdata() }, []);
   
    const showModal = (record) => {
      setisModalOpen(true);
    };

 
    function initdata(params) {
      axios.get(`/news?author=${User.username}&auditState=0&_expand=category`).then(res=>{
        setdataSource(res.data)
   })
    }
    const showConfirm = (record) => {
      confirm({
        title: "确认要删除新闻吗?",
        icon: <ExclamationCircleFilled />,
        content: "删除后不可恢复",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          axios
              .delete("/news/" + record.id)
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
        render: (text) => <strong>{text}</strong>,
      },
      {
        title: "新闻标题",
        dataIndex: "title",
        render: (text,record) => {
            const url='/#/news-manage/preview/'+record.id
            return <a href={url} >{text}</a>
        },
        width:280
        
      },
      {
        title: "作者",
        dataIndex: "author",
        key: "author",
      },
      {
        title: "分类",
        dataIndex: "category",
        key: "category",
        render: text => text.value,
      },
      {
        title: "操作",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
              <Button danger shape="circle" onClick={() => { showConfirm(record); }} icon={<DeleteOutlined />}  />
              <Button type="primary" shape="circle" onClick={()=> {navi('/news-manage/update/'+record.id)}} icon={<EditOutlined />}/>
              <Button  type="default" shape="circle" onClick={() => { 
                  axios.patch('/news/'+record.id,{
                    "auditState": 1,
                }).then(res=>{
                    let type=1
                    api.info({
                        message: `通知`,
                        description:
                          `您可以到${type===0?'草稿箱':'审核列表'}中查看新闻`,
                        placement:'bottomRight'
                      });
                   setTimeout(() => {
                    navi(type===0?'/news-manage/draft':'/audit-manage/list')
                    // window.location.reload()
                   }, 700);
                })
               }} icon={<SendOutlined />}  />
          </Space>
        ),
      },
    ];
  
  
    return (
        <>
        {contextHolder}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 15 }}
        rowKey='id'
      />
      </>
    )
}
