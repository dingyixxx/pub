import React,{useEffect,useState} from 'react'
import { PageHeader } from '@ant-design/pro-layout';
import { Button, Descriptions, Row, Statistic, Tag } from 'antd';
import axios from 'axios'
import moment from 'moment'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
export default function NewsPreview() {
    const params=useParams()
    const [newsInfo, setnewsInfo] = useState(null)
    const auditStates=["未审核","审核中","审核成功","审核失败"]
    const publishState=["未发布","发布中","发布成功","已下线"]
    const navi=useNavigate()
    useEffect(() => {
     axios.get(`/news/${params.id}?_expand=role&_expand=category`).then(res=>{
        setnewsInfo(res.data)
     })
    }, [params.id])
    
  return (
    <div>
      { newsInfo&& 
      <>
      <PageHeader
      className="site-page-header"
      title={newsInfo?.title}
      subTitle={newsInfo?.category.value}
      onBack={() => navi(-1)}
     
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="创建者">{newsInfo?.author}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{moment(newsInfo?.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
        <Descriptions.Item label="发布时间">{newsInfo?.publishTime?moment(newsInfo?.publishTime).format('YYYY-MM-DD HH:mm:ss'):'-'}</Descriptions.Item>
        <Descriptions.Item label="区域">{newsInfo?.region}</Descriptions.Item>
        <Descriptions.Item label="审核状态" contentStyle={{color:'red'}}>{auditStates[newsInfo?.auditState]}</Descriptions.Item>
        <Descriptions.Item label="发布状态" contentStyle={{color:'red'}}>{publishState[newsInfo?.publishState]}</Descriptions.Item>
        <Descriptions.Item label="访问数量">{newsInfo?.view}</Descriptions.Item>
        <Descriptions.Item label="点赞数量">{newsInfo?.star}</Descriptions.Item>
        <Descriptions.Item label="评论数量">0</Descriptions.Item>


      </Descriptions>
    </PageHeader>
    <div dangerouslySetInnerHTML={{__html:newsInfo?.content}} style={{boxSizing:'border-box',padding:'6px 16px'}}>
    </div>

    </>
    }

    </div>
  )
}
