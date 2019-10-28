import React, { useState } from "react";

import { Form, Input, Button, Card, Avatar, Row, Col } from "antd";
import Config from "../config/app.local.config";
import Banner from '../NavHeader/banner';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function clearFields() {
    setUsername("");
    setPassword("");
    setEmail("");
  }

  return (
    <>
      <div className='mainContent'>
        <Banner />
        <Card className="loginCard">
          <Avatar size={120} className="loginIcon" icon="user" />
          <h1 className="big-title">Create Account</h1>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Item>
              <Input
                type="text"
                className="loginInput"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>
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
            <Button type="primary" htmlType="submit" className="loginButton">
              Sign Up
          </Button>
          </Form>
        </Card>
      </div>
    </>
  );

  function handleSubmit() {
    const newUser = {
      email: email,
      username: username,
      password: password
    };
    fetch(`${Config.userServiceUrl}CreateUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      accepts: "application/json",
      body: JSON.stringify(newUser)
    })
      .then(res => {
        clearFields();
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default SignUp;
