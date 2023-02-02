import React,{useCallback} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import { Button, Checkbox, Form, Input } from "antd";
import Particles from "react-tsparticles";
import { loadFountainPreset } from "tsparticles-preset-fountain";
import { loadFull } from "tsparticles";
import axios from "axios";
const onFinish = (values) => {
  console.log('Success:', values);
  axios.get("http://127.0.0.1:5000/users?_expand=role").then(res=>{
    console.log(res)
  })
  localStorage.setItem('token',123)
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);

};

export default function Login() {
  const navi = useNavigate();
  const location = useLocation();
 
const customInit=async (engine)=>{
  // this adds the preset to tsParticles, you can safely use the
  await loadFountainPreset(engine);
}
const options = {
  preset: "fountain",
};

  return (
    <div>
    <Particles id="tsparticles" init={customInit}  options={options} />
    <div className={style.loginPage}>
      <div className={style.login_form}>
      <Form name="basic" labelCol={{ span: 5, }} wrapperCol={{ span: 16, }} onFinish={()=>{
        onFinish()
        navi(-1)
      }} onFinishFailed={onFinishFailed} autoComplete="off" >
        <h1 style={{textAlign:"center", color:'black'}}>小干拌</h1>
    <Form.Item label="用户名" name="username" rules={[ { required: true, message: '请输入用户名', } ]} >
      <Input />
    </Form.Item>

    <Form.Item label="密码" name="password" rules={[ { required: true, message: '请输入密码', }, ]} >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 11,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        登录
      </Button>
    </Form.Item>
  </Form>
      </div>


    </div>
    </div>
  );
}

