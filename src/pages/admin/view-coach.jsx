import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar';
import ViewCoachDetails from '../../components/ViewCoachDetails';

const ListCoach = (props) => {
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <ViewCoachDetails />
        </div>
    );
};

export default ListCoach;
