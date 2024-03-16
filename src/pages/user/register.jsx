import React, { useState } from 'react';
import Navbar from '../../components/User/Navbar';
import RegistrationForm from '../../components/RegistrationForm';
import Sidebar from '../../components/User/Sidebar';

const Register = (props) => {
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
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      <RegistrationForm />
    </div>
  );
};

export default Register;
