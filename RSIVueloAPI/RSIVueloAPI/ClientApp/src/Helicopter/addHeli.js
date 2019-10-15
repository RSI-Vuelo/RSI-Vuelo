import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import Config from '../config/app.local.config';

function AddHeli(props) {
  const [heliModel, setHeliModel] = useState();
  const [type, setType] = useState();
  const [capWeight, setCapWeight] = useState();
  const [crewMax, setCrewMax] = useState();
  const [crewMin, setCrewMin] = useState();
  const [fuseLength, setFuseLength] = useState();
  const [heliHeight, setHeliHeight] = useState();
  const [rotorDiam, setRotorDiam] = useState();
  const [engineType, setEngineType] = useState();
  const [maxSpeed, setMaxSpeed] = useState();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  function clearFields() {
    setHeliModel('');
    setType('');
    setCapWeight('');
    setCrewMax('');
    setCrewMin('');
    setFuseLength('');
    setHeliHeight('');
    setRotorDiam('');
    setEngineType('');
    setMaxSpeed('');
  }

  function addNewHelicopter() {
    const newHeli = {
      heliModel: heliModel,
      type: type,
      capWeight: capWeight,
      crewMax: crewMax,
      crewMin: crewMin,
      fuseLength: fuseLength,
      heliHeight: heliHeight,
      rotorDiam: rotorDiam,
      engineType: engineType,
      maxSpeed: maxSpeed,
    }

    fetch(`${Config.websiteServiceUrl}helicopter`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHeli)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        clearFields();
      })
      .catch(err => {
        props.handleError(err);
      });
  }

  return (
    <>
      <h1 className='big-title'>Add a Helicopter</h1>
      <Form {...formItemLayout} onSubmit={(event) => {
        event.preventDefault();
        addNewHelicopter();
      }}>
        <Form.Item label="Type"><Input type="text" placeholder='Type' name="type" value={type} onChange={(e) => setType(e.target.value)} /></Form.Item>
        <Form.Item label="Model"><Input type="text" placeholder='Model' name="heliModel" value={heliModel} onChange={e => setHeliModel(e.target.value)} /></Form.Item>
        <Form.Item label="Capcity Weight"><Input type="text" placeholder='Capcity Weight' name="capWeight" value={capWeight} onChange={(e) => setCapWeight(e.target.value)} /></Form.Item>
        <Form.Item label="Crew Maximum"><Input type="text" placeholder='Crew Maximum' name="crewMax" value={crewMax} onChange={(e) => setCrewMax(e.target.value)} /></Form.Item>
        <Form.Item label="Crew Minimum"><Input type="text" placeholder='Crew Minimum' name="crewMin" value={crewMin} onChange={(e) => setCrewMin(e.target.value)} /></Form.Item>
        <Form.Item label="Fuselage Length"><Input type="text" placeholder='Fuselage Length' name="fuseLength" value={fuseLength} onChange={(e) => setFuseLength(e.target.value)} /></Form.Item>
        <Form.Item label="Heigth"><Input type="text" placeholder='Height' name="heliHeight" value={heliHeight} onChange={(e) => setHeliHeight(e.target.value)} /></Form.Item>
        <Form.Item label="Rotor Diameter"><Input type="text" placeholder='Rotor Diameter' name="rotorDiam" value={rotorDiam} onChange={(e) => setRotorDiam(e.target.value)} /></Form.Item>
        <Form.Item label="Engine Type"><Input type="text" placeholder='Engine Type' name="engineType" value={engineType} onChange={(e) => setEngineType(e.target.value)} /></Form.Item>
        <Form.Item label="Max Speed"><Input type="text" placeholder='Max Speed' name="maxSpeed" value={maxSpeed} onChange={(e) => setMaxSpeed(e.target.value)} /></Form.Item>
        <Button type="primary" htmlType="submit" className='addHeliButton'>Submit</Button>
      </Form>
    </>
  );
}

export default AddHeli;