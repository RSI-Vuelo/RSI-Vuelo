import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, notification } from "antd";
import Config from "./config/app.local.config";

import "antd/dist/antd.css";
import "./App.css";

import Helicopter from "./Helicopter/Helicopter";
import AddHeli from "./Helicopter/addHeli";
import HeliDetailPage from "./Helicopter/heliDetailPage";
import Login from "./Helicopter/login";
import SignUp from "./Helicopter/signUp";

function App() {
  const [helicopters, setHelicopters] = useState([]);

  fetch(`${Config.helicopterServiceUrl}`, { method: `GET` })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      setHelicopters(res.helicopters);
    })
    .catch(err => {
      handleError(err);
    });

  const [users] = useState([
    {
      username: "Brayden",
      password: "test",
      email: "test"
    }
  ]);

  function handleError() {
    notification["error"]({
      message: "Oh No! Something went wrong!",
      description: `Sorry about that! It will be back up and running in a jiffy!`
    });
  }

  return (
    <Router>
      <Layout className="layout">
        <Route
          path="/"
          exact
          render={() => (
            <Helicopter
              helicopters={helicopters}
              handleError={handleError}
            />
          )}
        />
        <Route
          path="/addHeli"
          exact
          render={() => <AddHeli handleError={handleError} />}
        />
        <Route
          path={`/heliDetailPage/:id`}
          exact
          render={() => <HeliDetailPage />}
        />
        <Route
          path="/login"
          exact
          render={() => <Login users={users} />}
        />
        <Route path="/signUp" exact render={() => <SignUp />} />
      </Layout>
    </Router>
  );
}

export default App;
