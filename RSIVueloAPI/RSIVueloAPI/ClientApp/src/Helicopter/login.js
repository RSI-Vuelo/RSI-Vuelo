import React, { useState, useLocation } from 'react';
import { Form, Input, Button, notification, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Config from '../config/app.local.config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  function clearFields() {
    setUsername('');
    setPassword('');
  }

  function refreshPage() {
    useLocation.reload();
  }

  if (token) {
    return < Link to='/' />
  }

  return (
    <>
      <Card className='loginCard'>
        <Avatar size={120} className='loginIcon' icon="user" />
        <h1 className='big-title'>Log In</h1>
        <Form onSubmit={(e) => {
          e.preventDefault();
          authenticateUser();
        }} >
          <Form.Item><Input type="text" className='loginInput' placeholder='Username' name="username" value={username} onChange={(e) => setUsername(e.target.value)} /></Form.Item>
          <Form.Item><Input type="text" className='loginInput' placeholder='Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Item>
          <Button type="primary" htmlType="submit" className='loginButton'>Sign In</Button>
          <Link to='/signUp' ><p>Not a member yet? Sign up!</p></Link>
        </Form>
      </Card>
    </>
  );

  function authenticateUser() {
    const user = {
      username: username,
      password: password
    }
    fetch(`${Config.websiteServiceUrl}User/Login`, {
      method: 'GET',
      body: JSON.stringify(user)
    })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('username', username)
        clearFields();
        setToken(res.data.token);
        refreshPage();
      })
      .catch(err => {
        notification['error']({
          message: 'Oh No! Something went wrong!',
          description: `Sorry about that! This class could not be removed from the list`
        });
        clearFields();
      });
  }
}

export default Login;