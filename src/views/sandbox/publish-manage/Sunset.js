import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch } from "antd";

import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublishNews from "../../../hooks/usePublishNews";

const Sunset = () => {
    const {dataSource,handleDelete,contextHolder}=usePublishNews(2)
    return (
        <>
          {contextHolder}
        <NewsPublish dataSource={dataSource} btn={id=><Button type="primary"  danger onClick={()=>{handleDelete(id)}}>删除</Button>} /></>
    );
}

export default Sunset;
