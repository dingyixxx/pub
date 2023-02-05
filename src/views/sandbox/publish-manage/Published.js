import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch } from "antd";

import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublishNews from "../../../hooks/usePublishNews";
const Published = () => {
    const {dataSource,handleSunset,contextHolder}=usePublishNews(1)
    return (
        <>
        {contextHolder}
        <NewsPublish dataSource={dataSource} btn={id=><Button danger onClick={()=>{handleSunset(id)}}>下线</Button>}>
            
        </NewsPublish></>
    );
}

export default Published;
