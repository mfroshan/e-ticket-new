import React, { useState, useEffect } from 'react';
import {
  Container2,
  Heading,
  Table,
  Button
} from './StationListElements';
import Axios from 'axios';
import StationListContainer from '../StationListContainer';
import AddStationContainer from '../AddStationContainer';

const StationList = () => {
  const [isAddStationContainerOpen, setIsAddStationContainerOpen] = useState(
    false
  );
  const [items, setItems] = useState([]);

  const styleHeading = {
    color: '#fff',
    textAlign: 'center',
  };
  const styleCol1 = {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 0px 10px 10px',
    width: '45%',
    verticalAlign: 'top',
    borderRight: '1px solid #a4b0af',
  };
  const styleCol2 = {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 20px 10px 40px',
    verticalAlign: 'top',
  };

  const styleCol3 = {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 140px 10px 10px',
    justifyContent: "center",
    alignItems: "center",
  };
  
  const getStation = () => {
    Axios.post('http://localhost:3001/api/getStation', {}).then((res) => {
      const newItems = res.data.map((data) => ({
        Station_ID : data.Station_ID,
        Name: data.Name,
        District: data.District,
        station_status: data.station_status
      }));
      setItems(newItems);
    });
  }

  useEffect(() => {
    getStation();
  }, []);

  const addNewStation = () => {
    setIsAddStationContainerOpen(!isAddStationContainerOpen);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container2>
        <Heading>
          <h2 style={styleHeading}>Station List</h2>
        </Heading>

        <Table>
          <tr>
            <td style={styleCol1}>Station Name</td>
            <td style={styleCol2}>District</td>
            <td style={styleCol3}>Status</td>
            <td></td>
            <td></td>
          </tr>
        </Table>

        {items.map((item, index) => (
          <StationListContainer key={index} item={item} getStation={getStation}/>
        ))}
      </Container2>

      <Button onClick={addNewStation}>Add New Station</Button>

      {isAddStationContainerOpen && (
        <AddStationContainer
          setIsAddStationContainerOpen={setIsAddStationContainerOpen}
          isAddStationContainerOpen={isAddStationContainerOpen}
          getStation={getStation}
        />
      )}
    </div>
  );
};

export default StationList;
