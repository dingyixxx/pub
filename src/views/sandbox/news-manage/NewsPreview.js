import React,{useEffect,useState} from 'react'
import { PageHeader } from '@ant-design/pro-layout';
import { Button, Descriptions, Row, Statistic, Tag } from 'antd';
import axios from 'axios'
import { useParams, useSearchParams } from 'react-router-dom';
export default function NewsPreview() {
    const params=useParams()
    const [newsInfo, setnewsInfo] = useState({})
    
    useEffect(() => {
     axios.get(`/news/${params.id}?_expand=role&_expand=category`).then(res=>{
        setnewsInfo(res.data)
     })
    }, [params.id])
    
  return (
    <div>
        <PageHeader
      className="site-page-header"
      title="Title"
      subTitle="This is a subtitle"
     
    >
      <Descriptions size="small" column={3}>
        <Descriptions.Item label="创建者">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="创建时间">
          <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="发布时间">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="区域">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="审核状态">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
        <Descriptions.Item label="发布状态">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="访问数量">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="点赞数量">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="评论数量">Lili Qu</Descriptions.Item>


      </Descriptions>
    </PageHeader>
    </div>
  )
}
