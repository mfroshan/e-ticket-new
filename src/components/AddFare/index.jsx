import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Select, ButtonAndNavLinkBox } from './AddTrainStationContainerElements';
import Axios from 'axios';

function AddTrainFare(props) {
  const [StationPosition, setStationPosition] = useState("");
  const [StartStation, setStartStation] = useState("");
  const [EndStation, setEndStation] = useState("");
  const [stationList, setStationList] = useState([]);

  const addPressed = (event) => {
    event.preventDefault();

    console.log({trainName: props.trainName,
      trainID: props.trainID,
      StartStation: StartStation,
      EndStation: EndStation})
    
    if(StartStation === "" || EndStation === ""){
      alert('Please Select Stations');
      return;
    }
    if (StartStation === EndStation) {
      alert("Please Select Different Stations");
      return;
    }

    Axios.post("http://localhost:3001/api/addTrainFare", {
      trainName: props.trainName,
      trainID: props.trainID,
      StartStation: StartStation,
      EndStation: EndStation
    })
    .then((res) => {
      props.setisAddTrainFairVisible(false);
    });
  };

  const getStation = () => {
    Axios.post('http://localhost:3001/api/getStation', {}).then((res) => {
      setStationList(res.data);
    });
  }

  const cancelPressed = (event) => {
    event.preventDefault();
    props.setisAddTrainFairVisible(false);
  };

  useEffect(() => {
    getStation();
  },[])

  return (
    <Container>
      <Form>
        <label style={{ padding: "0px 0px 0px 0px" }}>Start Station Name</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <Select onChange={(e) => setStartStation(e.target.value)} required={true}>
          <option value="" disabled defaultValue>Select a station</option>
          {stationList && stationList.map((station, index) => (
            <option key={index} value={station.Station_ID}>
              {station.Name}
            </option>
          ))}
        </Select>
        <br></br>

        <label style={{ padding: "0px 0px 0px 0px" }}>End Station Name</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <Select onChange={(e) => setEndStation(e.target.value)} required={true}>
          <option value="" disabled defaultValue>Select a station</option>
          {stationList && stationList.map((station, index) => (
            <option key={index} value={station.Station_ID}>
              {station.Name}
            </option>
          ))}
        </Select>
        <br></br>

        <label style={{ padding: "0px 0px 0px 0px" }}>Train Fare</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <input style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => {setStationPosition(e.target.value)}} type="number" placeholder="Enter Position Number" required/>
        <br></br>

       
        {/* <input type="time" style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => console.log((e.target.value))}  placeholder="hh:mm:ss" required/> */}
        <br></br>

        <ButtonAndNavLinkBox>
          <Button onClick={addPressed}>Add</Button>
          <Button onClick={cancelPressed}>Cancel</Button>
        </ButtonAndNavLinkBox>
      </Form>
    </Container>
  );
}

export default AddTrainFare;
