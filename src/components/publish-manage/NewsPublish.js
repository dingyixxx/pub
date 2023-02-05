import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate ,useLocation} from "react-router-dom";
const { confirm } = Modal;

export default function NewsPublish(props) {

      const columns = [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "新闻标题",
          dataIndex: "title",
          key: "title",
          render: (text,record) => <a href={'/#/news-manage/preview/'+record.id}>{text}</a>,
        },
    
        {
          title: "作者",
          key: "author",
          dataIndex: "author",
        },
        {
          title: "新闻分类",
          key: "category",
          dataIndex: "category",
          render: (text) => text.title,
        },
        {
          title: "操作",
          key: "action",
          render: (_, record) =><>{props.btn(record.id)}</>
        },
      ];
  return (
    <>
    <Table
    columns={columns}
    dataSource={props.dataSource}
    pagination={{ pageSize: 14 }}
    rowKey='id'
  />
    </>
  )
}
