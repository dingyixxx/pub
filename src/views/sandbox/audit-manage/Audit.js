import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,notification } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled ,SendOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {AUDIT_STATES} from '../news-manage/NewsPreview'
import {TAG_COLOR_LIST} from './AuditList'
const { confirm } = Modal;

const Audit = () => {
    const [api, contextHolder] = notification.useNotification();
    const [dataSource, setdataSource] = useState([])
    const navi=useNavigate()
    const User=JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        init()
    }, [])
    const handleClick=(id,type)=>{
        let obj
        if(type===0){
            obj={
                "auditState": 2,
                "publishState": 1
            }
        }else{
            obj={
                "auditState": 3
            }
        }

        axios.patch('/news/'+id,{
            ...obj
        }).then(res=>{
            api.info({
                message: `通知`,
                description:
                  `您可以到审核列表中查看新闻`,
                placement:'bottomRight'
              });
           setTimeout(() => {
            navi('/audit-manage/list')
            // window.location.reload()
           }, 700);
        })
    }

    function init(params) {
        axios.get(`/news?auditState=1&_expand=category`).then(res=>{
            let result=res.data.filter(item=>{
                const {roleId,region,author}=item
                if(User.roleId===2){
                    return User.username===author||(roleId===3 && User.region===region)
                  }else if(User.roleId===1){
                    return true
                  }else{
                    return author===User.username
                  }
            })
            setdataSource(result)
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
          title: "操作",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
           <Button type="primary" shape="circle" icon={<CheckOutlined />}         onClick={()=>{handleClick(record.id,0)}}></Button>
           <Button type="primary" shape="circle" danger icon={<CloseOutlined />}  onClick={()=>{handleClick(record.id,1)}}></Button>
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

export default Audit;
