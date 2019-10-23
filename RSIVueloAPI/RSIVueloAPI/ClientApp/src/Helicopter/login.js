import React, { useState, useLocation } from "react";
import { Form, Input, notification, Card, Avatar, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import Config from "../config/app.local.config";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  function clearFields() {
    setUsername("");
    setPassword("");
  }

  function refreshPage() {
    window.location.reload();
  }

  async function authenticateUser() {
    const user = {
      username: username,
      password: password
    };
    const response = await fetch(`${Config.userServiceUrl}Authentication`, {
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => {
        console.log(res);
        setToken(res.token);
      })
      .then(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        // clearFields();
        // refreshPage();
      })
      .catch(err => {
        notification["error"]({
          message: "Oh No! Something went wrong!",
          description: `Sorry about that! We could not sign you in`
        });
        clearFields();
      });
    const userData = await response.json();
    if (!response.ok) throw new Error(response.status);
    console.log(response);
    setToken(userData.token);
    localStorage.setItem("Token", token);
    localStorage.setItem("username", userData.username);
  }

  return (
    <>
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
          {/*<Button onClick={(e) => authenticateUser()}/>*/}
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
    </>
  );
}

export default Login;
