import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import getRoutesAction from "../../../react-redux/getRoutesAction";
import  './RightList.scss'
const { confirm } = Modal;
function handleRightTreeData(data) {
  return data.map((item) => {
    if (item.children) {
      if (item.children.length > 0) {
        item.children = handleRightTreeData(item.children);
      } else {
        delete item.children;
      }
    } else {
      delete item.children;
    }
    return {
      ...item,
      key: [item.key],
    };
  });
}
function RightList(props) {
  const showConfirm = (record) => {
    confirm({
      title: "确认要删除权限吗?",
      icon: <ExclamationCircleFilled />,
      content: "删除后不可恢复",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        if (record.grade === 1) {
          axios
            .delete("http://127.0.0.1:5000/rights/" + record.id)
            .then((res) => {
              props.dispatch(getRoutesAction());
            });
        } else {
          axios
            .delete("http://127.0.0.1:5000/children/" + record.id)
            .then((res) => {
              props.dispatch(getRoutesAction());
            });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  useEffect(() => {
    if (props.routesRawData.length === 0) {
      props.dispatch(getRoutesAction());
    }
  }, [props]);
  const onChange = (checked,record) => {
    switch (record.grade) {
      case 1:
        axios.patch("http://127.0.0.1:5000/rights/" + record.id,{ pagepermisson:record.pagepermisson===1?2:1 }) 
        .then((res) => { props.dispatch(getRoutesAction()); });
        break;
      case 2:
        axios.patch("http://127.0.0.1:5000/children/" + record.id,{ pagepermisson:record.pagepermisson===1?2:1 }) 
        .then((res) => { props.dispatch(getRoutesAction()); });
        break;
    default:break
     
    }
  };
  const dataSource = useMemo(() => {
    const result = handleRightTreeData(
      JSON.parse(JSON.stringify(props.routesRawData))
    );
    return result;
  }, [props.routesRawData]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "权限名称",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "权限路径",
      key: "key",
      dataIndex: "key",
      render: (_, { key }) => (
        <>
          {key?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") { color = "volcano"; }
            return ( <Tag color={color} key={tag}> {tag} </Tag> );
          })}
        </>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
            <Button danger shape="circle" onClick={() => { showConfirm(record); }} icon={<DeleteOutlined />}  />
          <Popover content={<Switch  checked={record.pagepermisson===1} onChange={(isChecked)=>{
            onChange(isChecked,record)
          }} />} title="权限设置" trigger={record.pagepermisson?"click":""} >
          <Button type="primary" disabled={!record.pagepermisson} shape="circle" icon={<EditOutlined />}/>
          </Popover>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 4 }}
    />
  );
}

export default connect((state) => {
  return { routesRawData: state.routesRawData };
})(RightList);
