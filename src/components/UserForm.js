import React, { useEffect, useState, useMemo,forwardRef, useRef } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Popover, Select,Form, Input} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export  default  forwardRef((props,ref)=>{
    const {roleOptions,regionOptions}=props
    const [regionDisabled, setregionDisabled] = useState(false)
    
    
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
                <Select options={roleOptions} onChange={ (value) => {
                if(value===1){
                    ref.current.setFieldValue('region','')
                    setregionDisabled(true)
                }else{
                    setregionDisabled(false)

                }
              }}/>
            </Form.Item>

            <Form.Item name="region" label="区域"
            rules={!regionDisabled?[ { required: true, message: '请选择区域', }, ]:''}>
              <Select options={regionOptions} disabled={regionDisabled||props.regionIsDisabled} />
            </Form.Item>
           
          </Form>)
      
   
})
   


