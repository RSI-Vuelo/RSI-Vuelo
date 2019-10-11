import React, { useState, useLocation } from 'react';
import { Form, Input, notification, Card, Avatar } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Config from '../config/app.local.config';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  function clearFields() {
    setUsername('');
    setPassword('');
  }

  function refreshPage() {
    window.location.reload();
  }



  const Button = withRouter(({ history }) => (
    <button type="primary"
      className='loginButton'
      onClick={() => {
        const asdf = props.users.filter((u) => u.username === username && u.password === password);
        console.log(asdf);
        if (!isEmpty(asdf)) {
          localStorage.setItem("token", 'token');
          localStorage.setItem('username', username);
          setToken('token');
          clearFields();
          history.push('/');
          refreshPage();
        } else {
          clearFields();
          notification['error']({
            message: 'Oh No! Something went wrong!',
            description: `The Username or Password you entered was incorrect`
          });
        }
      }}
    >
      Sign In
    </button >
  ))

  return (
    <>
      <Card className='loginCard'>
        <Avatar size={120} className='loginIcon' icon="user" />
        <h1 className='big-title'>Log In</h1>
        <Form onSubmit={(e) => {
          e.preventDefault();
        }} >
          <Form.Item><Input type="text" className='loginInput' placeholder='Username' name="username" value={username} onChange={(e) => setUsername(e.target.value)} /></Form.Item>
          <Form.Item><Input type="text" className='loginInput' placeholder='Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Form.Item>
          <Button />
          {/* <Button type="primary" htmlType="submit" className='loginButton'>Sign In</Button> */}
          <Link to='/signUp' ><p>Not a member yet? Sign up!</p></Link>
        </Form>
      </Card>
    </>
  );


  // function authenticateUser() {
  //   const user = {
  //     username: username,
  //     password: password
  //   }
  //   fetch(`${Config.websiteServiceUrl}User/Login`, {
  //     method: 'GET',
  //     body: JSON.stringify(user)
  //   })
  //     .then(res => {
  //       localStorage.setItem("token", 'token');
  //       localStorage.setItem('username', username);
  //       clearFields();
  //       setToken('token');
  //       refreshPage();
  //     })
  //     .catch(err => {
  //       notification['error']({
  //         message: 'Oh No! Something went wrong!',
  //         description: `Sorry about that! We could not sign you in`
  //       });
  //       clearFields();
  //     });
  // }
}

export default Login;