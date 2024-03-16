import React, { useState } from 'react';
import ContactTable from '../../components/ContactTable';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';

const ContactUs = () => {
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
      <ContactTable />
    </div>
  );
};

export default ContactUs;
