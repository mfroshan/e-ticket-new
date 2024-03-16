import React, { useState } from 'react';
import Header from '../../components/User/Header';
import Home from './homeInfo';
import Navbar from '../../components/User/Navbar';
import PaymentLogos from '../../components/PaymentLogos';
import Sidebar from '../../components/User/Sidebar';

const HomePage = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      <Header 
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
      />
      <Home />
      <hr></hr>
      <PaymentLogos />
      <hr></hr>
    </div>
  );
};

export default HomePage;
