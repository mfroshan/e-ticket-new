import React, { useState } from 'react';
import {
  Container,
  Button,
  Heading,
  Form,
  NavLink,
  ButtonAndNavLinkBox,
} from './AddStationContainerElements';
import Axios from 'axios';

const AddStationContainer = (props) => {
  const [stationName, setStationName] = useState('');
  const [stationDistrict, setStationDistrict] = useState('');

  const styleHeading = {
    color: '#fff',
    textAlign: 'center',
  };
  const styleInput = {
    height: '40px',
    padding: '0px 0px 0px 10px',
  };
  const styleLabel = {
    padding: '0px 0px 0px 0px',
  };
  const styleHr = {
    background: 'transparent',
    color: 'transparent',
    margin: '0',
    borderStyle: 'none',
    height: '1vw',
  };

  const addPressed = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:3001/api/addNewStation', {
      station_name: stationName,
      station_district: stationDistrict,
    }).then((res) => {
      if (res.data.isValid) {
        alert('Station Added Successfully!');
        props.getStation();
      } else {
        alert('Station already exists!');
      }
    });

    props.setIsAddStationContainerOpen();
  };

  const cancelPressed = (event) => {
    event.preventDefault();

    props.setIsAddStationContainerOpen();
  };

  return (
    <Container>
      <Heading>
        <h2 style={styleHeading}>Add New Station</h2>
      </Heading>

      <Form>
        <label style={styleLabel}>Station Name</label>
        <hr style={styleHr}></hr>
        <input
          style={styleInput}
          onChange={(e) => setStationName(e.target.value)}
          type="text"
          placeholder="Enter Station Name"
        />
        <br></br>

        <label style={styleLabel}>Station District</label>
        <hr style={styleHr}></hr>
        <input
          style={styleInput}
          onChange={(e) => setStationDistrict(e.target.value)}
          type="text"
          placeholder="Enter Station District"
        />
        <br></br>

        <ButtonAndNavLinkBox>
          <Button onClick={addPressed}>Add</Button>
          <Button onClick={cancelPressed}>Cancel</Button>
        </ButtonAndNavLinkBox>
      </Form>
    </Container>
  );
};

export default AddStationContainer;
