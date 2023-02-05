import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Switch } from "antd";

import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePublishNews from "../../../hooks/usePublishNews";

const Unpublished = () => {
    const {dataSource,handlePublish,contextHolder}=usePublishNews(0)
    return (
        <>
               {contextHolder}
        <NewsPublish dataSource={dataSource} btn={id=><Button type="primary" onClick={()=>{handlePublish(id)}}>发布</Button>}/>

        </>
    );
}

export default Unpublished;
