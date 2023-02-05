import React,{useState,useEffect} from 'react'
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch,notification } from "antd";

export default function usePublishNews(type) {
    const [dataSource, setdataSource] = useState([])
    const [api, contextHolder] = notification.useNotification();
    const User=JSON.parse(localStorage.getItem('token'))
    const handlePublish=id=>{
        axios.patch(`/news/`+id,{
            publishState:2,
            publishTime:Date.now()
         }).then(async res=>{
           await init()
            api.info({
                message: `通知`,
                description:<>您可以到<span style={{color:'gold'}}>发布管理-已发布</span>中查看新闻</>,
                placement:'bottomRight'
              });
        })
    }
    const handleSunset=id=>{
        axios.patch(`/news/`+id,{
            publishState:3
         }).then(async res=>{
           await init()
            api.info({
                message: `通知`,
                description:<>您可以到<span style={{color:'coral'}}>发布管理-已下线</span>中查看新闻</>,
                placement:'bottomRight'
              });
        })
    }
    const handleDelete=id=>{
        axios.delete(`/news/`+id).then(async res=>{
           await init()
            api.info({
                message: `通知`,
                description:<>您已经删除这条新闻</>,
                placement:'bottomRight'
              });
        })
    }
    useEffect(() => {
        init()
    }, [])

    function init(params) {
        axios.get(`/news?author=${User.username}&publishState=${type+1}&_expand=category`).then(res=>{
            setdataSource(res.data)
        })
    }

  return {
    dataSource,handlePublish,handleSunset,handleDelete,contextHolder
  }
}


