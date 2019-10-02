import React from 'react';
import { List } from 'antd';

import HelicopterCard from './helicopter-card';

const Helicopter = (props) => {
  return (
    <List
      grid={{
        gutter: 80,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
      }}
      dataSource={props.filtHeli}
      renderItem={h => (
        <List.Item>
          <HelicopterCard helicopter={h} />
        </List.Item>
      )}
    />
  )
}

export default Helicopter; 