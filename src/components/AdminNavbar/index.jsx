import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Title, Bars, NavLink, NavMenu } from './AdminNavbarElements';

const AdminNavbar = (props) => {
    const history = useNavigate();

    const logoutPressed = (event) => {
        event.preventDefault();

        props.setAdminID(0);
        history.push('/admin-login');
    };

    return (
        <>
            <Nav>
                <Title>
                    <h3>Railway E-Ticketing Service</h3>
                </Title>
                <Bars onClick={props.toggleSidebar} />
                <NavMenu>
                    <NavLink to='/stations' activeStyle>
                        Stations
                    </NavLink>
                    <NavLink to='/trains' activeStyle>
                        Add Train
                    </NavLink>
                    <NavLink to='/trains-list' activeStyle>
                        Trains List
                    </NavLink>
                    <NavLink to='/add-clerk' activeStyle>
                        Add Clerk
                    </NavLink>
                    <NavLink to='/clerk-list' activeStyle>
                        Clerk List
                    </NavLink>
                    <NavLink to='/users-list' activeStyle>
                        Users
                    </NavLink>
                    <NavLink to='/admin-login' onClick={logoutPressed} activeStyle>
                        Logout
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default AdminNavbar;
