import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Select, InputContainerRight, InputContainerLeft, SpaceContainer, Button } from './FindCardElements';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../App.css';

const FindCard = (props) => {
    const navigate = useNavigate();
  const [styleLabel, setStyleLabel] = useState({
    color: "#fff",
    fontWeight: 'bold',
    padding: "0px 0px 8px 0px",
  });

  const [date, setDate] = useState(new Date());
  const [stationList, setStationList] = useState([]);
  const [selectedFromStationName, setSelectedFromStationName] = useState("");
  const [selectedToStationName, setSelectedToStationName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedClassID, setSelectedClassID] = useState(0);
  const [selectedNoOfPassengers, setSelectedNoOfPassengers] = useState(0);

  useEffect(() => {
    Axios.post("http://localhost:3001/api/getStationList", {})
      .then((res) => {
        const stations = res.data.map(station => station.Name);
        setStationList(stations);
      });
  }, []);

  const findPressed = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/api/getStationIDForFindCard", {
      stationName: selectedFromStationName,
    })
      .then((res) => {
        props.setFromStationID(res.data[0].Station_ID);
        props.setJourneyDate(selectedDate);
        props.setClassID(parseInt(selectedClassID));
        props.setNoOfPassengers(parseInt(selectedNoOfPassengers));
      });

    Axios.post("http://localhost:3001/api/getStationIDForFindCard", {
      stationName: selectedToStationName,
    })
      .then((res) => {
        console.log(res.data);
        // props.setToStationID(res.data[0].Station_ID);
            navigate('/trainlist');
  
      });
  };

  return (
    <Container>
      <InputContainerLeft>
        <label style={styleLabel}>From</label>
        <Select onChange={(e) => { setSelectedFromStationName(e.target.value) }} >
          <option value="" disabled selected>Select a station</option>
          {stationList.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </Select>
      </InputContainerLeft>
      <SpaceContainer />
      <InputContainerRight>
        <label style={styleLabel}>To</label>
        <Select onChange={(e) => { setSelectedToStationName(e.target.value) }} >
          <option value="" disabled selected>Select a station</option>
          {stationList.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
        </Select>
      </InputContainerRight>
      <InputContainerLeft>
        <label style={styleLabel}>Date</label>
        <DatePicker
          wrapperClassName="datePicker"
          calendarClassName="red-border"
          placeholderText="Select a date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat='yyyy-MM-dd'
          minDate={new Date()}
          maxDate={new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000))}
        />
      </InputContainerLeft>
      <SpaceContainer />
      <InputContainerRight>
        <label style={styleLabel}>Class</label>
        <Select onChange={(e) => { setSelectedClassID(e.target.value) }} >
          <option value="" disabled selected>Select a class</option>
          <option value="1" >AC</option>
          <option value="2">Non-AC</option>
        </Select>
      </InputContainerRight>
      <InputContainerLeft>
        <label style={styleLabel}>Passenger(s)</label>
        <Select onChange={(e) => { setSelectedNoOfPassengers(e.target.value) }} >
          <option value="" disabled selected>No of passenger(s)</option>
          <option value="1" >1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Select>
      </InputContainerLeft>

      <Button onClick={findPressed}>Find</Button>
    </Container>
  );
};

export default FindCard;
