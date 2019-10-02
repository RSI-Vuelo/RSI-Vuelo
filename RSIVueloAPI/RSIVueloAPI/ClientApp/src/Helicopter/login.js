import React, { useState } from 'react';
import { Form, Input } from 'antd';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <h1 className='big-title'>Login</h1>
      <Form {...formItemLayout}>
        <Form.Item label="Username"><Input type="text" className='formItem' placeholder='Username' name="username" value={username} onChange={(e) => setUsername(e.target.value)} /></Form.Item>
        <Form.Item label="Password"><Input type="text" className='formItem' placeholder='Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Item>
      </Form>
    </>
  )
}

export default Login;