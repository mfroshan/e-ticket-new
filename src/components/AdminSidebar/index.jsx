import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarContainer, Icon, CloseIcon, SidebarLink, SidebarWrapper, SidebarMenu } from './AdminSidebarElements';

const AdminSidebar = (props) => {
    const history = useNavigate();

    const logoutPressed = (event) => {
        event.preventDefault();
        props.setAdminID(0);
        history('/admin-login');
    };

    return (
        <SidebarContainer isSidebarOpen={props.isSidebarOpen} onClick={props.toggleSidebar}>
            <Icon onClick={props.toggleSidebar}>
                <CloseIcon />
            </Icon>

            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to='/stations' activeStyle>
                        Stations
                    </SidebarLink>
                    <SidebarLink to='/trains' activeStyle>
                       Add Train
                    </SidebarLink>
                    <SidebarLink to='/trains-list' activeStyle>
                       Train List
                    </SidebarLink>
                    <SidebarLink to='/add-clerk' activeStyle>
                        Add Clerk
                    </SidebarLink>
                    <SidebarLink to='/clerk-list' activeStyle>
                        Clerk List
                    </SidebarLink>
                    <SidebarLink to='/users-list' activeStyle>
                        Users
                    </SidebarLink>
                    <SidebarLink to='/admin-login' onClick={logoutPressed} activeStyle>
                        Logout
                    </SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

export default AdminSidebar;
