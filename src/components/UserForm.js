import React, { useEffect, useState, useMemo,forwardRef, useRef } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Select,Form, Input} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export  default  forwardRef((props,ref)=>{
  const {regionIsDisabled,setregionIsDisabled,checkRegionIsDisabled,checkRoleIdIsDisabled}=props
    const {roleOptions,regionOptions}=props
    
   return ( <Form
            ref={ref}
          >
            <Form.Item name="username" label="用户名" 
            rules={[ { required: true, message: '请输入用户名', }, ]} >
              <Input />
            </Form.Item>

            <Form.Item name="password" label="密码"
            rules={[ { required: true, message: '请输入密码', }, ]}>
              <Input  />
            </Form.Item>

            <Form.Item name="roleId" label="角色"
            rules={[ { required: true, message: '请选择角色', }, ]}>
                <Select options={roleOptions.map(item=>{
                return {...item,disabled:checkRoleIdIsDisabled(item.value)}})} onChange={ (value) => {
                if(value===1){
                    ref.current.setFieldValue('region','')
                    setregionIsDisabled(true)
                }else{
                  setregionIsDisabled(false)

                }
              }}/>
            </Form.Item>

            <Form.Item name="region" label="区域"
            rules={!regionIsDisabled?[ { required: true, message: '请选择区域', }, ]:''}>
              <Select options={regionOptions.map(item=>{
                return {...item,disabled:checkRegionIsDisabled(item.title)}})} disabled={regionIsDisabled} />
            </Form.Item>
          </Form>)
      
   
})
   


