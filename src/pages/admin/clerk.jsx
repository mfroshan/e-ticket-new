import React, { useState } from 'react';
import AddClerkContainer from '../../components/AddClerkContainer';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import FindClerkContainer from '../../components/FindClerkContainer';

const Clerks = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const style = {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 0px 80px 0px',
    };

    return (
        <div style={style}>
            <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setAdminID={props.setAdminID} adminID={props.adminID} />
            <AdminNavbar toggleSidebar={toggleSidebar} setAdminID={props.setAdminID} adminID={props.adminID} />
            <FindClerkContainer />
            <AddClerkContainer />
        </div>
    );
};

export default Clerks;
