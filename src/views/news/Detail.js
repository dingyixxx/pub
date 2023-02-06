import React,{useEffect,useState} from 'react'
import { PageHeader } from '@ant-design/pro-layout';
import { Button, Descriptions, Row, Statistic, Tag } from 'antd';
import axios from 'axios'
import moment from 'moment'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
export const AUDIT_STATES=["未审核","审核中","审核成功","审核失败"]
export  const PUBLISH_STATES=["未发布","待发布","发布成功","已下线"]
export  const COLOR_LIST=["black","gold","green","red"]

export default function Detail() {
  const params=useParams()
    const [newsInfo, setnewsInfo] = useState(null)

  
   
    const navi=useNavigate()
    useEffect(() => {
      axios.get(`/news/${params.id}?_expand=role&_expand=category`).then(res=>{
        axios.patch(`/news/${params.id}`,{view:((res.data.view+1)-0)}).then(res=>{
          axios.get(`/news/${params.id}?_expand=role&_expand=category`).then(res=>{
            setnewsInfo({...res.data})
          })
       })
     })
    }, [ ])
    
  return (
    <div style={{width:'92%',margin:'20px auto'}}>
      { newsInfo&& 
      <>
      <PageHeader
      className="site-page-header"
      title={newsInfo?.title}
      subTitle={<><span style={{marginRight:'8px'}}>{newsInfo.category.value}</span><HeartTwoTone onClick={()=>{
        axios.patch(`/news/${params.id}`,{star:((newsInfo.star+1)-0)}).then(res=>{
          axios.get(`/news/${params.id}?_expand=role&_expand=category`).then(res=>{
            setnewsInfo({...res.data})
          })
       })
      }} twoToneColor="#eb2f96"></HeartTwoTone></>}
      onBack={() => navi(-1)}
     
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="创建者">{newsInfo?.author}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{newsInfo?.publishTime?moment(newsInfo?.publishTime).format('YYYY-MM-DD HH:mm:ss'):'-'}</Descriptions.Item>
        <Descriptions.Item label="区域">{newsInfo?.region}</Descriptions.Item>
        <Descriptions.Item label="访问数量">{newsInfo?.view}</Descriptions.Item>
        <Descriptions.Item label="点赞数量">{newsInfo?.star}</Descriptions.Item>
        <Descriptions.Item label="评论数量">0</Descriptions.Item>


      </Descriptions>
    </PageHeader>
    <div dangerouslySetInnerHTML={{__html:newsInfo?.content}} style={{boxSizing:'border-box',padding:'6px 16px',border:'1px solid #cccccc',marginTop:'12px',width:'96%',margin:'20px auto'}}>
    </div>

    </>
    }

    </div>
  )
}
