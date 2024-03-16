import React, { useEffect, useState } from 'react';
import { Container, Table } from './JourneyUserContainerElements';
import Axios from 'axios';

const JourneyUserContainer = (props) => {
  const [trainName, setTrainName] = useState('');
  const [startName, setStartName] = useState('');
  const [endName, setEndName] = useState('');

  const styleTable = {
    //borderStyle: "ridge",
    // borderLeft: "1.5px solid #a4b0af",
    // borderBottom: "2px solid #a4b0af",
  };
  const styleRow = {
    borderTop: '1px solid #a4b0af',
  };
  const styleCol1 = {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px 0px 10px 10px',
    width: '40%',
    verticalAlign: 'top',
    borderRight: '1px solid #a4b0af',
  };
  const styleCol2 = {
    fontSize: '16px',
    padding: '10px 0px 10px 10px',
    verticalAlign: 'top',
  };

  useEffect(() => {
    // Getting the trainName from trainID
    Axios.post('http://localhost:3001/api/getTrainName', {
      trainID: props.item.Train_ID,
    }).then((res) => {
      setTrainName(res.data[0].Name);
    });

    // Getting the startName from trainID and Start_position
    Axios.post('http://localhost:3001/api/getStationID', {
      trainID: props.item.Train_ID,
      position: props.item.Start_position,
    }).then((res) => {
      const stationID = res.data[0].Station_ID;
      Axios.post('http://localhost:3001/api/getStationName', {
        stationID: stationID,
      }).then((res) => {
        setStartName(res.data[0].Name);
      });
    });

    // Getting the endName from trainID and End_position
    Axios.post('http://localhost:3001/api/getStationID', {
      trainID: props.item.Train_ID,
      position: props.item.End_position,
    }).then((res) => {
      const stationID = res.data[0].Station_ID;
      Axios.post('http://localhost:3001/api/getStationName', {
        stationID: stationID,
      }).then((res) => {
        setEndName(res.data[0].Name);
      });
    });
  }, [props.item]);

  return (
    <Container>
      <Table style={styleTable}>
        <tr>
          <td style={styleCol1}>Ticket ID:</td>
          <td style={styleCol2}>{props.item.Ticket_ID}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>Train Name:</td>
          <td style={styleCol2}>{trainName}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>Coach ID:</td>
          <td style={styleCol2}>{props.item.Coach_ID}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>No of seats:</td>
          <td style={styleCol2}>{props.item.No_of_seats}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>Station From:</td>
          <td style={styleCol2}>{startName}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>Station To:</td>
          <td style={styleCol2}>{endName}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>Departure Date and Time:</td>
          <td style={styleCol2}>{props.item.Journey_time}</td>
        </tr>

        <tr style={styleRow}>
          <td style={styleCol1}>Issue Date and Time:</td>
          <td style={styleCol2}>{props.item.Issue_time}</td>
        </tr>
      </Table>
    </Container>
  );
};

export default JourneyUserContainer;
