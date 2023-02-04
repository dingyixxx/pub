import React,{useRef, useState,useEffect} from 'react'
import { Button, Descriptions, Row, Statistic, Select,Steps , notification, Form, Input} from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import style from './NewsAdd.module.css'
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor';
import { useNavigate } from 'react-router-dom';
export default function NewsAdd() {
    const [api, contextHolder] = notification.useNotification();
    const [current, setcurrent] = useState(0)
   const newsForm=useRef(null)
   const navi=useNavigate()
   const [options, setoptions] = useState([])
   const [formInfo, setformInfo] = useState({})
   const [content, setcontent] = useState('')
   const User=JSON.parse(localStorage.getItem('token'))
   useEffect(() => {
     axios.get('/categories').then(res=>{
        setoptions(res.data.map(item=>{return {...item,value:item.id,label:item.title}}))
     })
   }, [])

   const handleEditContent=content=>setcontent(content)
   const handleSave=type=>{
    console.log({
        ...formInfo,
        content,
        "region":User.region||"全球",
        "roleId":User.roleId ,
        "auditState": type,
        "publishState": 0,
        "createTime": Date.now(),
        "star": 0,
        "view": 0,
        "publishTime": 0,
        "author": User.username
    })
    // axios.post('/news',{
    //     ...formInfo,
    //     content,
    //     "region":User.region||"全球",
    //     "roleId":User.roleId ,
    //     "auditState": type,
    //     "publishState": 0,
    //     "createTime": Date.now(),
    //     "star": 0,
    //     "view": 0,
    //     "publishTime": 0,
    //     "author": User.username
    // }).then(res=>{
    //     api.info({
    //         message: `通知`,
    //         description:
    //           `您可以到${type===0?'草稿箱':'新闻列表'}中查看新闻`,
    //         placement:'bottomRight'
    //       });
    //    setTimeout(() => {
    //     navi(type===0?'/news-manage/draft':'/news-manage/list')
    //     // window.location.reload()
    //    }, 600);
    // })
   }
   
  return (
    <>  {contextHolder}
   
    <div>
      
<PageHeader
      className="site-page-header"
      title="撰写新闻"
      subTitle="This is a subtitle"
    >
  
    </PageHeader>
    <Steps
    current={current}
    items={[
      {
        title: '基本信息',
        description:'新闻标题、新闻分类',
      },
      {
        title: '新闻内容',
        description:'新闻主体内容',
      },
      {
        title: '新闻提交',
        description:'保存草稿或者提交审核',
      },
    ]}
  />
  <div className={current===0?style.active:style.hidden}>
  <Form
    name="basic"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 16 }}
    style={{ width: '100%' ,marginTop:'40px'}}
    initialValues={{ remember: true }}
    autoComplete="off"
    ref={newsForm}
  >
    <Form.Item
      label="新闻标题"
      name="title"
      rules={[{ required: true, message: 'Please input newsTitle!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="新闻分类"
      name="categoryId"
      rules={[{ required: true, message: 'Please input newsCategory!' }]}
    >
       <Select
      options={options}
    />
    </Form.Item>


  </Form>
    
  </div>
  <div className={current===1?style.active:style.hidden}>
    <NewsEditor handleEditContent={handleEditContent}></NewsEditor>
  </div>
  <div className={current===2?style.active:style.hidden}>
    <Button type='primary'  onClick={()=>{handleSave(0)}}>保存草稿箱</Button>
    <Button danger onClick={()=>{handleSave(1)}}>提交审核</Button>
  </div>

{ current > 0&&<Button onClick={()=>{setcurrent(current-1)}}>上一步</Button> }
{ current < 2&&<Button  onClick={()=>{
    if(current===0){
        newsForm.current.validateFields().then(res=>{
            setformInfo(res)
            setcurrent(current+1)
        }).catch(err=>console.log(err))
    }else if(current===1){
        console.log(formInfo,content)
        setcurrent(current+1)

    }
    }}>下一步</Button> }
{ current === 2&&<Button>完成</Button> }
    </div>
    </>
  )
}
