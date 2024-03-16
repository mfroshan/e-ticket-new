import React from 'react';
import { Nav, Title, Bars, NavLink, NavMenu } from './NavbarElements';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <>
      <Nav>
        <Title>
          <h3>Railway E-Ticketing Service</h3>
        </Title>
        <Bars onClick={toggleSidebar} />
        <NavMenu>
          <NavLink as={Link} to='/' activeStyle={{ color: 'red' }}>
            Home
          </NavLink>
          <NavLink as={Link} to='/login' activeStyle={{ color: 'red' }}>
            Login
          </NavLink>
          <NavLink as={Link} to='/register' activeStyle={{ color: 'red' }}>
            Register
          </NavLink>
          <NavLink as={Link} to='/verify-ticket' activeStyle={{ color: 'red' }}>
            Verify Ticket
          </NavLink>
          <NavLink as={Link} to='/contact-us' activeStyle={{ color: 'red' }}>
            Contact Us
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
