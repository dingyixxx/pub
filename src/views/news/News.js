import React, { useEffect, useRef, useState } from "react";


import { PageHeader } from '@ant-design/pro-layout';
import { Button, Descriptions, Row, Statistic, Tag } from 'antd';
import axios from 'axios'
import moment from 'moment'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Card, Col, List, Drawer } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import * as echarts from "echarts";
import _ from "lodash";
const { Meta } = Card;
export default function News() {
  const [newsList, setnewsList] = useState([])
  useEffect(() => {
    axios.get("/news?&publishState=2&_expand=category").then(res=>{
      const list=_.groupBy(res.data, (state) => state.category.title);
      setnewsList(Object.entries(list).map((([key,value])=>{
        return {
          name:key,
          count:value.length,
          datas:value
        }
      })))
    })
  }, [])
  
  return (

    <div style={{width:'98%',margin:'0 auto'}}>
     <PageHeader
      className="site-page-header"
      title='小干拌全球新闻速览'
      subTitle='查看新闻'
    ></PageHeader>
        <Row gutter={[6,16]}>
          {
            newsList.map(item=>{
              return   <Col span={8} key={Math.random()}>
              <Card title={item.name}  hoverable={true} bordered={true}>
                <List
                  size="small"
                  dataSource={item.datas}
                  style={{height:'260px'}}
                  pagination={{position:'bottom',pageSize:10}}
                  renderItem={(item) => (
                    <List.Item>
                      <a href={"/#/detail/" + item.id}>{item.title}</a>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            })
          }
      
     
   
      </Row>
    </div>
  )
}
