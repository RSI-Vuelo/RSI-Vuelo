import React, { useState, useEffect } from 'react';
import { Menu, Icon, Drawer } from 'antd';

const NavHeader = (props) => {
  const [auth] = useState(localStorage.getItem('token') || '');
  const { SubMenu } = Menu;
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  }

  useEffect(() => {
    console.log(menuOpen);
  }, [menuOpen])

  return (
    <>
      <Icon type="right-square" theme="twoTone" onClick={toggleMenu} className='menuIcon' />
      <Drawer placement='top'
        onClose={() => setMenuOpen(false)}
        visible={menuOpen}
      >
        <p> hello </p>
      </Drawer>
      {/* <div className='myMenu'>
                  <Menu mode="horizontal">
                    <Menu.Item key='home'>
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
                </div> */
      }
    </>
  )
}

export default NavHeader;