import React from 'react';
import { Container, TextBox, FindCardBox } from './HeaderElements';
import FindCard from '../FindCard';

const Header = (props) => {
  const {
    setPassengerMail,
    passengerMail,
    setFromStationID,
    fromStationID,
    setToStationID,
    toStationID,
    setFromStationPosition,
    fromStationPosition,
    setToStationPosition,
    toStationPosition,
    setJourneyDate,
    journeyDate,
    setClassID,
    classID,
    setNoOfPassengers,
    noOfPassengers,
    setSelectedTrainID,
    selectedTrainID,
  } = props;

  return (
    <Container>
      <TextBox>
        <h1>Welcome to <br/>Railway <br/>E-Ticketing Service</h1>
      </TextBox>

      <FindCardBox>
        <FindCard
          setPassengerMail={setPassengerMail}
          passengerMail={passengerMail}
          setFromStationID={setFromStationID}
          fromStationID={fromStationID}
          setToStationID={setToStationID}
          toStationID={toStationID}
          setFromStationPosition={setFromStationPosition}
          fromStationPosition={fromStationPosition}
          setToStationPosition={setToStationPosition}
          toStationPosition={toStationPosition}
          setJourneyDate={setJourneyDate}
          journeyDate={journeyDate}
          setClassID={setClassID}
          classID={classID}
          setNoOfPassengers={setNoOfPassengers}
          noOfPassengers={noOfPassengers}
          setSelectedTrainID={setSelectedTrainID}
          selectedTrainID={selectedTrainID}
        />
      </FindCardBox>
    </Container>
  );
};

export default Header;
