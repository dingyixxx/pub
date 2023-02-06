import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Row, List, Drawer } from "antd";
import { Button } from "antd";
import axios from "axios";
import {
  EditOutlined,
  EllipsisOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import * as echarts from "echarts";
import _ from "lodash";
const { Meta } = Card;

export default function Home() {
  const container = useRef();
  const pie = useRef();
  const [open, setOpen] = useState(false);
  const [viewList, setviewList] = useState([]);
  const [starList, setstarList] = useState([]);
  const [pieInstance, setpieInstance] = useState(null);
  const [allList, setallList] = useState([]);
  const {
    username,
    region,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));

  const showDrawer = () => {
    setOpen(true);
    var myPie;
    setTimeout(() => {
      if (!pieInstance) {
        myPie = echarts.init(pie.current);
        setpieInstance(myPie);
      } else {
        myPie = pieInstance;
      }

      const list=_.groupBy(allList.filter(item=>item.author===username), (state) => state.category.title);
      const arr=Object.entries(list).map(([key,value])=>{
       return {value: value.length, name: key}
      })
      const option = {
        title: {
          text: `${username}的新闻分布`,
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          bottom: 'bottom'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
             radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
          
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
          
            data: arr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      setTimeout(() => {
        myPie.setOption(option);
      }, 0);
    }, 0);

    const fn = function () {
      console.log("resize");
      myPie.resize();
    };
    window.addEventListener("resize", fn);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    var myChart = echarts.init(container.current);
    const fn = function () {
      console.log("resize");
      myChart.resize();
    };
    window.addEventListener("resize", fn);
    axios.get("/news?&publishState=2&_expand=category").then((res) => {
      setallList(res.data);
      const aaa = _.groupBy(res.data, (state) => state.category.title);
      myChart.setOption({
        title: {
          text: "新闻分类展示",
        },
        tooltip: {},
        legend: {
          data: ["新闻数量"],
          icon: "rect",
          // ...
        },
        xAxis: {
          data: Object.keys(aaa),
          axisLabel: {
            // rotate: 90,
            interval: 0,
          },
        },
        yAxis: {
          minInterval: 2,
        },
        series: [
          {
            type: "bar",
            name: "新闻数量",
            data: Object.values(aaa).map((item) => item.length),
          },
        ],
      });
    });
    return () => {
      window.removeEventListener("resize", fn);
      // window.onresize=null
    };
  }, []);

  useEffect(() => {
    axios
      .get("/news?&publishState=2&_sort=view&_order=desc&_limit=8")
      .then((res) => {
        setviewList(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/news?&publishState=2&_sort=star&_order=desc&_limit=8")
      .then((res) => {
        setstarList(res.data);
      });
  }, []);

  useEffect(() => {
    return () => {
      //  window.removeEventListener('resize',fn)
      // window.onresize=null
    };
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" style={{ height: "100%" }}>
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={"/#/news-manage/preview/" + item.id}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" style={{ height: "100%" }}>
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <a href={"/#/news-manage/preview/" + item.id}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              width: 300,
            }}
            cover={
              <img
                alt="example"
                src="https://tvax4.sinaimg.cn/crop.0.0.888.888.1024/67676721ly8gghg19426yj20oo0oota7.jpg?KID=imgbed,tva&Expires=1675673946&ssig=yfQUFFcSNB"
              />
            }
            actions={[
              <PieChartOutlined
                key="setting"
                onClick={() => {
                  showDrawer();
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://tvax4.sinaimg.cn/crop.0.0.888.888.1024/67676721ly8gghg19426yj20oo0oota7.jpg?KID=imgbed,tva&Expires=1675673946&ssig=yfQUFFcSNB" />
              }
              title={<strong>李狗剩·{username}</strong>}
              description={
                <>
                  <strong style={{ marginRight: "16px" }}>
                    {region || "牛栏山-马兰坡"}
                  </strong>{" "}
                  <strong> {roleName}</strong>
                </>
              }
            />
          </Card>
        </Col>
      </Row>
      <div
        style={{ width: "100%", marginTop: "20px", height: "600px" }}
        ref={container}
      ></div>
      <Drawer
        title={`${username}的新闻分布`}
        placement="right"
        onClose={onClose}
        open={open}
        width="500px"
      >
        <div ref={pie} style={{ width: "100%", height: "400px" }}></div>
      </Drawer>
    </>
  );
}
