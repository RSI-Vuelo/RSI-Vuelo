import React, { useState } from 'react';
import { Icon, Drawer, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Config from "../config/app.local.config";

const NavHeader = (props) => {
  const [auth] = useState(localStorage.getItem('token') || '');
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    console.log('here');
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

    function handleSession() {
      var token = localStorage.getItem('token');
      fetch(`${Config.userServiceUrl}Logout`, {
          method: "GET",
          headers: {
              'Authorization': `Bearer ${token}`,
              //'X-CSRF-TOKEN': 
          }
      });
  }

  return (
    <>
      <Icon type="right-square" theme="twoTone" onClick={toggleMenu} className='menuIcon' />
      <div className='navHeader'>
        <Drawer
          placement='top'
          onClose={() => setMenuOpen(false)}
          visible={menuOpen}
        >
          <Row>
            <Col span={3} offset={1}>
              <Link to="/">
                <h1 className='drawerContentTitle'><Icon type="home" />Home</h1>
              </Link>
            </Col>
            {auth ?
              <Col span={5}>
                <Link to="/addHeli">
                  <h1 className='drawerContentTitle'><Icon type="plus-circle" />Add Helicopter</h1>
                </Link>
              </Col>
              : ''}
            {auth ?
              <>
                <Col span={3} offset={10}>
                  <Link to='/' onClick={() => {
                    handleSession();
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    //document.location.reload();
                  }}>
                    <h1 className='drawerContentTitle'><Icon type="profile" />Logout</h1>
                  </Link>
                </Col>
              </>
              :
              <Col span={3} offset={16}>
                <Link to={{
                  pathname: '/login',
                  state: { users: props.users }
                }}>
                  <h1 className='drawerContentTitle'><Icon type="profile" />Login</h1>
                </Link>
              </Col>
            }
          </Row>
        </Drawer>
      </div>
    </>
  )
}

export default NavHeader;