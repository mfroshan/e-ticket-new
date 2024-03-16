import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Select, ButtonAndNavLinkBox } from './AddTrainStationContainerElements';
import Axios from 'axios';
import TimePicker from 'react-time-picker';
function AddTrainStationContainer(props) {
  const [StationPosition, setStationPosition] = useState("");
  const [selectedStationName, setSelectedStationName] = useState("");
  const [selectedUpTime, setSelectedUpTime] = useState("");
  const [selectedDownTime, setSelectedDownTime] = useState("");
  const [stationList, setStationList] = useState([]);

  const addPressed = (event) => {
    event.preventDefault();

    console.log({trainName: props.trainName,
      trainID: props.trainID,
      selectedStationName: selectedStationName,
      selectedUpTime: selectedUpTime,
      selectedDownTime: selectedDownTime,
      position: StationPosition})
    // Validation check before adding
    if(!StationPosition){
      console.log("StationPosition",StationPosition)
      return;
    }
    if (selectedStationName === "" || selectedUpTime === "" || selectedDownTime === "" ) {
      alert("Please fill out all required fields.");
      return;
    }

    Axios.post("http://localhost:3001/api/addTrainStation", {
      trainName: props.trainName,
      trainID: props.trainID,
      stationID: selectedStationName,
      selectedUpTime: selectedUpTime,
      selectedDownTime: selectedDownTime,
      position: StationPosition,
    })
    .then((res) => {
      props.setIsAddTrainStationContainerVisible(false);
    });
  };

  const getStation = () => {
    Axios.post('http://localhost:3001/api/getStation', {}).then((res) => {
      setStationList(res.data);
    });
  }

  const cancelPressed = (event) => {
    event.preventDefault();
    props.setIsAddTrainStationContainerVisible(false);
  };

  useEffect(() => {
    getStation();
  },[])

  // Function to format time as HH:mm
  const formatTime = (time) => {
    const date = new Date(time);
    console.log(date)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <Container>
      <Form>
        <label style={{ padding: "0px 0px 0px 0px" }}>Station Name</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <Select onChange={(e) => setSelectedStationName(e.target.value)} required={true}>
          <option value="" disabled defaultValue>Select a station</option>
          {stationList && stationList.map((station, index) => (
            <option key={index} value={station.Station_ID}>
              {station.Name}
            </option>
          ))}
        </Select>
        <br></br>

        <label style={{ padding: "0px 0px 0px 0px" }}>Station Position</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <input style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => {setStationPosition(e.target.value)}} type="number" placeholder="Enter Position Number" required/>
        <br></br>

        <label style={{ padding: "0px 0px 0px 0px" }}>Station Up Time</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <TimePicker 
  style={{ height: "40px", padding: "0px 0px 0px 10px" }} 
  onChange={(time) => setSelectedUpTime(time)}
  value={selectedUpTime}
/>

        {/* <input type="time" style={{ height: "40px", padding: "0px 0px 0px 10px" }} onChange={(e) => setSelectedUpTime(formatTime(e.target.value))}  placeholder="hh:mm:ss" required/> */}
        <br></br>

        <label style={{ padding: "0px 0px 0px 0px" }}>Station Down Time</label>
        <hr style={{ background: "transparent", color: "transparent", margin: "0", borderStyle: "none", height: "1vw" }}></hr>
        <TimePicker 
  style={{ height: "40px", padding: "0px 0px 0px 10px" }} 
  onChange={(time) => setSelectedDownTime(time)}
  value={selectedDownTime}
  />
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

export default AddTrainStationContainer;
