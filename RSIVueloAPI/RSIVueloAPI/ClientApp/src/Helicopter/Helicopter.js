import React, { useState } from 'react';
import { Input, Layout, Menu } from 'antd';
import { isEmpty } from 'lodash'

import HelicopterList from './helicopter-list';

const { Content, Sider } = Layout;

function Helicopter(props) {
  const { Search } = Input;
  const [filtHeli, setFiltHeli] = useState([]);
  const [typeSelected, setTypeSelected] = useState('');

  const allTypes = props.helicopters.map(h => h.type);
  const uniqueTypes = allTypes.filter((r, index) => allTypes.indexOf(r) === index);
  const makeItems = uniqueTypes.map(t => <Menu.Item key={t} onClick={() => handleSelected(t)}>{t}</Menu.Item>);

  function handleSearch(value) {
    const regex = new RegExp(value, 'i');
    const searchResults = (props.helicopters.filter(h => h.model.search(regex) === 0));
    const filteredResults = isEmpty(typeSelected) || typeSelected === 'All' ? searchResults : searchResults.filter((r) => r.type === typeSelected);
    setFiltHeli(filteredResults);
  }

  function handleSelected(type) {
    const helisOfOneType = props.helicopters.filter(h => h.type === type);
    setTypeSelected(type);
    setFiltHeli(helisOfOneType);
  };

  return (
    <>
      <Layout>
        <Sider>
          <Menu
            mode="inline"
            className='sider'
          >
            <Menu.Item key={'All'} onClick={() => handleSelected('All')}>All</Menu.Item>
            {makeItems}
          </Menu>
        </Sider>
        <Layout>
          <Content>
            <h1 className='big-title'>Helicopters</h1>
            <Search
              placeholder="Search for helicopters"
              onChange={(e) => handleSearch(e.target.value)}
              className='search'
              enterButton
            />
            <HelicopterList filtHeli={isEmpty(filtHeli) ? props.helicopters : filtHeli} />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default Helicopter;

