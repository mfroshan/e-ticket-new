import React, { useState } from 'react';
import Navbar from '../../components/User/Navbar';
import Sidebar from '../../components/User/Sidebar';
import TicketVerification from '../../components/TicketVerification';

const VerifyTicket = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [style, setStyle] = useState({
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px 80px 0px",
  });
  const [message, setMessage] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={style}>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      <TicketVerification message={message} setMessage={setMessage} />
    </div>
  );
};

export default VerifyTicket;
