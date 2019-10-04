import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const NavHeader = () => {
  const [auth] = useState(localStorage.getItem('token') || '');

  return (
    <>
      <Menu mode="horizontal" theme='dark'>
        <Menu.Item className='home' key='home'>
          <Link to="/">
            <Icon type="home" />
            Home
            </Link>
        </Menu.Item>
        {auth ? <Menu.Item className='addHeli'>
          <Link to="/addHeli">
            <Icon type="plus-circle" />
            Add Helicopter
            </Link>
        </Menu.Item> : ''}
        {auth ?
          <Menu.Item className='userLogin'>
            <Link to='/' onClick={() => {
              localStorage.removeItem('token');
              document.location.reload();
            }}>
              <Icon type="profile" />
              Logout
              </Link>
          </Menu.Item>
          :
          <Menu.Item className='userLogin'>
            <Link to='/login'>
              <Icon type="profile" />
              Login
              </Link>
          </Menu.Item>
        }
      </Menu>
    </>
  )
}

export default NavHeader; 