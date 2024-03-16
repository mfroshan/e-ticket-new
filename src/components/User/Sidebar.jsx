import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarContainer, Icon, CloseIcon, SidebarLink, SidebarWrapper, SidebarMenu } from './SidebarElemenst';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen} onClick={toggleSidebar}>
      <Icon onClick={toggleSidebar}>
        <CloseIcon />
      </Icon>

      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink as={Link} to='/home' activeStyle={{ color: 'red' }}>
            Home
          </SidebarLink>
          <SidebarLink as={Link} to='/login' activeStyle={{ color: 'red' }}>
            Login
          </SidebarLink>
          <SidebarLink as={Link} to='/register' activeStyle={{ color: 'red' }}>
            Register
          </SidebarLink>
          <SidebarLink as={Link} to='/verify-ticket' activeStyle={{ color: 'red' }}>
            Verify Ticket
          </SidebarLink>
          <SidebarLink as={Link} to='/contact-us' activeStyle={{ color: 'red' }}>
            Contact Us
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
