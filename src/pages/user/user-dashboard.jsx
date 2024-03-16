import React, { useState } from 'react';
import NavbarUser from '../../components/User/NavbarUser';
import SidebarUser from '../../components/User/SidebarUser';
import DashboardUserContainer from '../components/DashboardUserContainer';

const DashboardUser = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [style] = useState({
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px 80px 0px",
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={style}>
      <SidebarUser
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setPassengerMail={props.setPassengerMail}
        passengerMail={props.passengerMail}
      />
      <NavbarUser
        toggleSidebar={toggleSidebar}
        setPassengerMail={props.setPassengerMail}
        passengerMail={props.passengerMail}
      />

      <DashboardUserContainer 
        setPassengerMail={props.setPassengerMail} 
        passengerMail={props.passengerMail} 
        setPassengerNid={props.setPassengerNid}
        passengerNid={props.passengerNid} 
        setPassengerName={props.setPassengerName}
        passengerName={props.passengerName} 
        setPassengerMobile={props.setPassengerMobile}
        passengerMobile={props.passengerMobile} 
        setPassengerPassword={props.setPassengerPassword}
        passengerPassword={props.passengerPassword} 
      />
    </div>
  );
};

export default DashboardUser;
