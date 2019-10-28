import React from 'react';
import { Row, Col } from "antd";

import NavHeader from '../NavHeader/navHeader';

export default function Banner() {
  return (
    <Row className='header'>
      <Col span={1} offset={2}>
        <h1 className="big-title">
          Helicopters
            </h1>
      </Col>
      <Col span={1} offset={18}>
        <NavHeader />
      </Col>
    </Row>
  )
}