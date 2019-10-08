import React, { useState } from 'react';
import { Form, Input, Button, notification, Card, Avatar } from 'antd';
import Config from '../config/app.local.config';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
      <Card className='loginCard'>
        <Avatar size={120} className='loginIcon' icon="user" />
        <h1 className='big-title'>Create Account</h1>
        <Form {...formItemLayout} onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} >
          <Form.Item><Input type="text" className='loginInput' placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Form.Item>
          <Form.Item><Input type="text" className='loginInput' placeholder='Username' name="username" value={username} onChange={(e) => setUsername(e.target.value)} /></Form.Item>
          <Form.Item><Input type="text" className='loginInput' placeholder='Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Item>
          <Button type="primary" htmlType="submit" className='loginButton'>Sign Up</Button>
        </Form>
      </Card>
    </>
  )

  function handleSubmit() {
    const newUser = {
      email: email,
      username: username,
      password: password
    }
    fetch(`${Config.websiteServiceUrl}user/signUp`, {
      method: 'POST',
      body: JSON.stringify(newUser)
    })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! Your account was created`
        });
      });
  }
}

export default SignUp;