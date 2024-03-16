import React, { useState } from 'react';
import AddTrainStepper from '../../components/AddTrainContainer';
// import AddTrainContainer from '../../components/AddTrainContainer';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';

export default function Trains(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "0px 0px 80px 0px" }}>
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setAdminID={props.setAdminID} adminID={props.adminID} />
      <AdminNavbar toggleSidebar={toggleSidebar} setAdminID={props.setAdminID} adminID={props.adminID} />
      {/* <AddTrainContainer /> */}
      <AddTrainStepper />
    </div>
  );
}
