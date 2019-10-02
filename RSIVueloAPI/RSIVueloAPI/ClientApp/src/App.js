import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, notification } from 'antd';

import "antd/dist/antd.css";
import './App.css';

import Helicopter from './Helicopter/Helicopter';
import NavHeader from './NavHeader/navHeader';
import AddHeli from './Helicopter/addHeli';
import HeliDetailPage from './Helicopter/heliDetailPage';
import Login from './Helicopter/login';

function App() {
  const { Content, Header } = Layout;

  const helicopterHash1 = '7b3a88b8bd33c2405ed870f489d93def';
  const helicopterHash2 = '1cc3e1cc8283f7b9d43b75452a7d08aa';
  const helicopterHash3 = 'b48828b0a86e137da4017bcaedccfc0b';

  const [helicopters] = useState([
    {
      '_id': helicopterHash1,
      'type': 'Focke-Wulf',
      'model': 'Hw 6093450934561',
      'capWeight': '28000',
      'crewMax': '4',
      'crewMin': '3',
      'fuseLength': '98ft 10in',
      'heliHeight': '18ft 11in',
      'rotorDiam': '60',
      'engineType': '',
      'maxSpeed': '170 knots',
      'src': 'https://hips.hearstapps.com/pop.h-cdn.co/assets/17/09/980x553/gallery-1488384411-screen-shot-2017-03-01-at-110225-am.png?resize=980:*'
    },
    {
      '_id': helicopterHash1,
      'type': 'Focke-Wulf',
      'model': 'Fw 61',
      'capWeight': '28000',
      'crewMax': '4',
      'crewMin': '3',
      'fuseLength': '98ft 10in',
      'heliHeight': '18ft 11in',
      'rotorDiam': '60',
      'engineType': '',
      'maxSpeed': '170 knots',
      'src': 'https://hips.hearstapps.com/pop.h-cdn.co/assets/17/09/980x553/gallery-1488384411-screen-shot-2017-03-01-at-110225-am.png?resize=980:*'
    },
    {
      '_id': helicopterHash2,
      'type': 'Sikorsky',
      'model': 'R-4',
      'src': 'https://hips.hearstapps.com/pop.h-cdn.co/assets/17/09/1280x753/gallery-1488385872-screen-shot-2017-03-01-at-113048-am.png?resize=980:*'
    },
    {
      '_id': helicopterHash3,
      'type': 'Bell',
      'model': '47',
      'src': 'https://hips.hearstapps.com/pop.h-cdn.co/assets/17/09/980x522/gallery-1488388001-bell-47-credit-keystonegetty.png?resize=980:*'
    }
  ])

  function handleError(err) {
    notification['error']({
      message: 'Oh No! Something went wrong!',
      description: `Sorry about that! It will be back up and running in a jiffy!`
    });
  }

  return (
    <Router>
      <Layout className='layout'>
        <Header className='header'>
          <NavHeader />
        </Header>
        <Layout>
          <Layout>
            <Content className='content'>
              <Route path='/' exact render={() => <Helicopter helicopters={helicopters} handleError={handleError} />} />
              <Route path='/addHeli' exact render={() => <AddHeli handleError={handleError} />} />
              <Route path={`/heliDetailPage/:id`} exact render={() => <HeliDetailPage />} />
              <Route path='/login' exact render={() => <Login />} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
