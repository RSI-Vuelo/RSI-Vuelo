import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const NavHeader = (props) => {
  const [auth] = useState(localStorage.getItem('token') || '');

  const { SubMenu } = Menu;

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
          <SubMenu className='userLogin' title={<><Icon type="profile" className='userProfileItem' />{localStorage.username}</>} >
            <Menu.Item>
              <Link to='/' onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                document.location.reload();
              }}>
                <Icon type="profile" />
                Logout
            </Link>
            </Menu.Item>
          </SubMenu>

          :
          <Menu.Item className='userLogin'>
            <Link to={{
              pathname: '/login',
              state: {
                users: props.users
              }
            }}
            >
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