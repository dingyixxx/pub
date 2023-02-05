import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled ,SendOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {AUDIT_STATES} from '../news-manage/NewsPreview'
const { confirm } = Modal;
export  const TAG_COLOR_LIST=["","volcano","green","red"]
const AuditList = () => {
    const [api, contextHolder] = notification.useNotification();
    const [dataSource, setdataSource] = useState([])
    const navi=useNavigate()
    const User=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        init()
    }, [])

    function init(params) {
        axios.get(`/news?author=${User.username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res=>{
            setdataSource(res.data)
        })
    }
    

    const columns = [
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
          title: "审核状态",
          dataIndex: "auditState",
          key: "auditState",
          render: text => <Tag color={TAG_COLOR_LIST[text]} > {AUDIT_STATES[text]} </Tag>
        },
        {
          title: "操作",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
                {record.auditState===2&&<Button onClick={()=>{
                     axios.patch(`/news/`+record.id,{
                        publishState:2,
                        publishTime:Date.now()
                     }).then(async res=>{
                       await init()
                        api.info({
                            message: `通知`,
                            description:<>您可以到<span style={{color:'gold'}}>发布管理-已发布</span>中查看新闻</>,
                            placement:'bottomRight'
                          });

                          setTimeout(() => {
                            navi('/publish-manage/published')
                            // window.location.reload()
                           }, 700);
               
                    })
                }} danger>发布</Button>}
                {record.auditState===1&&<Button onClick={()=>{
                     axios.patch(`/news/`+record.id,{
                        auditState:0
                     }).then(async res=>{
                       await init()
                        let type=0
                        api.info({
                            message: `通知`,
                            description:
                              `您可以到${type===0?'草稿箱':'审核列表'}中查看新闻`,
                            placement:'bottomRight'
                          });
               
                    })
                }}>撤销</Button>}
                {record.auditState===3&&<Button type="primary" onClick={()=>{
                    navi('/news-manage/update/'+record.id)
                }}>更新</Button>}
            </Space>
          ),
        },
      ];

    return (
        <>
        {contextHolder}
        <div>
            <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 15 }}
        rowKey='id'
      />
        </div></>
    );
}

export default AuditList;
