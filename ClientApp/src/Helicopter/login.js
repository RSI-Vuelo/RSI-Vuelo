import React, { useState } from "react";
import { Form, Input, Row, Col, Card, Avatar, Button, notification } from "antd";
import { Link } from "react-router-dom";
import Config from "../config/app.local.config";
import Banner from '../NavHeader/banner';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function clearFields() {
    setUsername("");
    setPassword("");
  }

  function refreshPage() {
    window.location.href = '/';
  }

  async function authenticateUser() {
    const user = {
      username: username,
      password: password
    };
    const response = await fetch(`${Config.userServiceUrl}Authenticate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
      },
      accepts: 'application/json',
      body: JSON.stringify(user)
    });
    try {
      const userData = await response.json();
      if (!response.ok) throw new Error(response.status);
      localStorage.setItem("token", userData.token);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("favorites", userData.favorites);
      refreshPage();
      clearFields();
    } catch (err) {
      notification(err);
    }
  }

  return (
    <>
      <div className='mainContent'>
        <Banner />
        <Card className="loginCard">
          <Avatar size={120} className="loginIcon" icon="user" />
          <h1 className="big-title">Log In</h1>
          <Form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <Form.Item>
              <Input
                type="text"
                className="loginInput"
                placeholder="Username"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                type="text"
                className="loginInput"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={authenticateUser}
              className="loginButton"
            >
              Sign In
          </Button>
            <Link to="/signUp">
              <p>Not a member yet? Sign up!</p>
            </Link>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Login;

