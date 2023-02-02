import React,{useCallback} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import { Button, Checkbox, Form, Input } from "antd";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const onFinish = (values) => {
  console.log('Success:', values);
  localStorage.setItem('token',123)
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);

};

export default function Login() {
  const navi = useNavigate();
  const location = useLocation();
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);
  return (
    <div className={style.loginPage}>
      <Particles id="tsparticles"  init={particlesInit} loaded={particlesLoaded} />
      <div className={style.login_form}>
      <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} onFinish={()=>{
        onFinish()
        navi(-1)
      }} onFinishFailed={onFinishFailed} autoComplete="off" >
    <Form.Item label="用户名" name="username" rules={[ { required: true, message: '请输入用户名', } ]} >
      <Input />
    </Form.Item>

    <Form.Item label="密码" name="password" rules={[ { required: true, message: '请输入密码', }, ]} >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
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
  
  );
}

