import React, { useState } from "react";
import { Input, Drawer, Button, Divider, Slider, Radio } from "antd";
import { isEmpty } from "lodash";
import escapeStringRegexp from "escape-string-regexp";

import HelicopterList from "./helicopter-list";
function Helicopter(props) {
  const { Search } = Input;
  const [filtHeli, setFiltHeli] = useState([]);
  const [typeSelected, setTypeSelected] = useState("All");
  const [visible, setVisible] = useState(false);
  const [capWeight, setCapWeight] = useState(10000);
  const [crewMax, setCrewMax] = useState(15);
  const [crewMin, setCrewMin] = useState(1);
  const [fuseLength, setFuseLength] = useState(50);
  const [heliHeight, setHeliHeight] = useState(5);
  const [rotorDiam, setRotorDiam] = useState(10);
  const [maxSpeed, setMaxSpeed] = useState(1);

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };

  const allTypes = props.helicopters.map(h => h.type);
  const uniqueTypes = allTypes.filter(
    (r, index) => allTypes.indexOf(r) === index
  );
  const makeItems = uniqueTypes.map(t => (
    <Radio
      value={t}
      style={radioStyle}
      key={t}
      onClick={() => handleSelected(t)}
    >
      {t}
    </Radio>
  ));

  function handleSearch(value) {
    const escapedString = escapeStringRegexp(value);
    const searchResults = props.helicopters.filter(
      h => h.model.search(escapedString) === 0
    );
    const filteredResults =
      typeSelected === "All"
        ? searchResults
        : searchResults.filter(
            r =>
              r.type === typeSelected &&
              r.capWeight >= capWeight &&
              r.crewMax <= crewMax &&
              r.crewMin >= crewMin &&
              r.fuseLength >= fuseLength &&
              r.heliHeight >= heliHeight &&
              r.rotorDiam >= rotorDiam &&
              r.maxSpeed >= maxSpeed
          );
    setFiltHeli(filteredResults);
  }

  function handleSelected(type) {
    const helisOfOneType = props.helicopters.filter(h => h.type === type);
    setTypeSelected(type);
    setFiltHeli(helisOfOneType);
  }

  function handleSlider() {
    const sliderResults = props.helicopters.filter(h =>
      typeSelected === "All"
        ? parseInt(h.capWeight) >= capWeight &&
          parseInt(h.crewMax) <= crewMax &&
          parseInt(h.crewMin) >= crewMin &&
          parseInt(h.fuseLength) >= fuseLength &&
          parseInt(h.heliHeight) >= heliHeight &&
          parseInt(h.rotorDiam) >= rotorDiam &&
          parseInt(h.maxSpeed) >= maxSpeed
        : h.type === typeSelected &&
          parseInt(h.capWeight) >= capWeight &&
          parseInt(h.crewMax) <= crewMax &&
          parseInt(h.crewMin) >= crewMin &&
          parseInt(h.fuseLength) >= fuseLength &&
          parseInt(h.heliHeight) >= heliHeight &&
          parseInt(h.rotorDiam) >= rotorDiam &&
          parseInt(h.maxSpeed) >= maxSpeed
    );
    setFiltHeli(sliderResults);
  }

  function showDrawer() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }

  return (
    <>
      <h1 className="big-title">
        {typeSelected === "All" || isEmpty(typeSelected)
          ? "Helicopters"
          : typeSelected}
      </h1>
      <Search
        placeholder={`Search for${
          typeSelected === "All" || isEmpty(typeSelected)
            ? ""
            : ` ${typeSelected}`
        } Helicopters`}
        onChange={e => handleSearch(e.target.value)}
        className="search"
        enterButton
      />
      <br />
      <Button type="primary" className="filterButton" onClick={showDrawer}>
        Filter Options
      </Button>
      <Drawer
        title="Filter Options"
        onClose={onClose}
        visible={visible}
        maskClosable={true}
        className="filterOptionDrawer"
      >
        <h3>Type</h3>
        <Radio.Group>
          <Radio
            value={"All"}
            style={radioStyle}
            defaultChecked={true}
            onClick={() => handleSelected("All")}
          >
            All
          </Radio>
          {makeItems}
        </Radio.Group>
        <Divider />
        <span>
          <h3>Minimum Capacity Weight</h3>
          <p>{`${capWeight} pounds`}</p>
        </span>
        <Slider
          defaultValue={capWeight}
          min={10000}
          max={50000}
          onChange={setCapWeight}
          onAfterChange={handleSlider}
        />
        <Divider />
        <span>
          <h3>Maximum Crew Members</h3>
          <p>{`${crewMax} ${crewMax === 1 ? "person" : "people"}`}</p>
        </span>
        <Slider
          defaultValue={crewMax}
          min={1}
          max={15}
          onChange={setCrewMax}
          onAfterChange={handleSlider}
        />
        <Divider />
        <span>
          <h3>Minimum Crew Members</h3>
          <p>{`${crewMin} ${crewMin === 1 ? "person" : "people"}`}</p>
        </span>
        <Slider
          defaultValue={crewMin}
          min={1}
          max={15}
          onChange={setCrewMin}
          onAfterChange={handleSlider}
        />
        <Divider />
        <span>
          <h3>Minimum Fuselage Length</h3>
          <p>{`${fuseLength} meters`}</p>
        </span>
        <Slider
          defaultValue={fuseLength}
          min={50}
          max={200}
          onChange={setFuseLength}
          onAfterChange={handleSlider}
        />
        <Divider />
        <span>
          <h3>Minimum Helicopter Height</h3>
          <p>{`${heliHeight} meters`}</p>
        </span>
        <Slider
          defaultValue={heliHeight}
          min={5}
          max={40}
          onChange={setHeliHeight}
          onAfterChange={handleSlider}
        />
        <Divider />
        <span>
          <h3>Minimum Rotor Diameter</h3>
          <p>{`${rotorDiam} meters`}</p>
        </span>
        <Slider
          defaultValue={rotorDiam}
          min={10}
          max={100}
          onChange={setRotorDiam}
          onAfterChange={handleSlider}
        />
        <Divider />
        <h3>Engine Type</h3>
        <Divider />
        <span>
          <h3>Minimum Top Speed</h3>
          <p>{`${maxSpeed} knot${maxSpeed === 1 ? "" : "s"}`}</p>
        </span>
        <Slider
          defaultValue={maxSpeed}
          min={1}
          max={300}
          onChange={setMaxSpeed}
          onAfterChange={handleSlider}
        />
      </Drawer>
      <HelicopterList
        filtHeli={isEmpty(filtHeli) ? props.helicopters : filtHeli}
      />
    </>
  );
}

export default Helicopter;
