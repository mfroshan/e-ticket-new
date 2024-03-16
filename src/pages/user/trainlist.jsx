import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import Axios from 'axios';
import TrainListContainer from '../../components/TrainListContainer';

const TrainList = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [trainIDFromPositionToPositionList, setTrainIDFromPositionToPositionList] = useState([]);
  const [style] = useState({
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px 80px 0px",
  });

  useEffect(() => {
    Axios.post("http://localhost:3001/api/getTrainIDFromPositionToPositionList", {
      fromStationID: props.fromStationID,
      toStationID: props.toStationID,
    })
    .then((res) => {
      const updatedList = res.data.map(item => ({
        trainID: item.trainID,
        fromStationPosition: item.fromStationPosition,
        toStationPosition: item.toStationPosition,
      }));
      setTrainIDFromPositionToPositionList(updatedList);
    });
  }, [props.fromStationID, props.toStationID]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={style}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      <TrainListContainer 
        setPassengerMail={props.setPassengerMail} 
        passengerMail={props.passengerMail}
        setFromStationID={props.setFromStationID}
        fromStationID={props.fromStationID}
        setToStationID={props.setToStationID}
        toStationID={props.toStationID}
        setFromStationPosition={props.setFromStationPosition}
        fromStationPosition={props.fromStationPosition}
        setToStationPosition={props.setToStationPosition}
        toStationPosition={props.toStationPosition}
        setJourneyDate={props.setJourneyDate}
        journeyDate={props.journeyDate}
        setClassID={props.setClassID}
        classID={props.classID}
        setNoOfPassengers={props.setNoOfPassengers}
        noOfPassengers={props.noOfPassengers}
        setSelectedTrainID={props.setSelectedTrainID}
        selectedTrainID={props.selectedTrainID}
        trainIDFromPositionToPositionList={trainIDFromPositionToPositionList}
        selectedTrainIDFromPositionToPosition={props.selectedTrainIDFromPositionToPosition}
        setSelectedTrainIDFromPositionToPosition={props.setSelectedTrainIDFromPositionToPosition}
        setClerkID={props.setClerkID} 
        clerkID={props.clerkID}
      />
    </div>
  );
};

export default TrainList;
