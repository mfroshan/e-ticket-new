import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Heading, Form, Select, ButtonAndNavLinkBox } from './AddClerkContainerElements';
import Axios from 'axios';

const AddClerkContainer = () => {
    const [selectedStationName, setSelectedStationName] = useState('');
    const [clerkName, setClerkName] = useState('');
    const [clerkMobile, setClerkMobile] = useState('');
    const [clerkPassword, setClerkPassword] = useState('');
    const [stationList, setStationList] = useState([]);
    const history = useNavigate();

    const styleHeading = {
        color: '#fff',
        textAlign: 'center',
    };

    const styleInput = {
        height: '40px',
        padding: '0px 0px 0px 10px',
    };

    const styleLabel = {
        padding: '0px 0px 0px 0px',
    };

    const styleHr = {
        background: 'transparent',
        color: 'transparent',
        margin: '0',
        borderStyle: 'none',
        height: '1vw',
    };

    useEffect(() => {
        Axios.post('http://localhost:3001/api/getStationList', {}).then((res) => {
            const stations = res.data.map((station) => station.Name);
            setStationList(stations);
        });
    }, []);

    const addPressed = (event) => {
        event.preventDefault();

        Axios.post('http://localhost:3001/api/addNewClerk', {
            clerkName,
            clerkMobile,
            clerkPassword,
            selectedStationName,
        }).then((res) => {
            if (res.data.isValid) {
                alert('Clerk Added Successfully!');
                history('/clerk-list');
            } else {
                alert('Clerk already exists!');
            }
        });
    };

    return (
        <Container>
            <Heading>
                <h2 style={styleHeading}>Add New Clerk</h2>
            </Heading>

            <Form>
                <label style={styleLabel}>Clerk Name</label>
                <hr style={styleHr}></hr>
                <input style={styleInput} onChange={(e) => setClerkName(e.target.value)} type="text" placeholder="Enter Name" />
                <br></br>

                <label style={styleLabel}>Clerk Mobile No.</label>
                <hr style={styleHr}></hr>
                <input style={styleInput} onChange={(e) => setClerkMobile(e.target.value)} type="number" placeholder="Enter Mobile No" />
                <br></br>

                <label style={styleLabel}>Clerk Password</label>
                <hr style={styleHr}></hr>
                <input style={styleInput} onChange={(e) => setClerkPassword(e.target.value)} type="password" placeholder="Enter Password" />
                <br></br>

                <label style={styleLabel}>Station Name</label>
                <hr style={styleHr}></hr>
                <Select onChange={(e) => setSelectedStationName(e.target.value)}>
                    <option value="" disabled selected>
                        Select a station
                    </option>
                    {stationList.map((station, index) => (
                        <option key={index} value={station}>
                            {station}
                        </option>
                    ))}
                </Select>
                <br></br>
                <hr style={styleHr}></hr>

                <ButtonAndNavLinkBox>
                    <Button onClick={addPressed}>Add</Button>
                </ButtonAndNavLinkBox>
            </Form>
        </Container>
    );
};

export default AddClerkContainer;
