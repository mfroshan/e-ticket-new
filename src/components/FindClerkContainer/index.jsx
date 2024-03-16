import React, { useState } from 'react';
import { Container, Button, Heading, Form, ButtonAndNavLinkBox } from './FindClerkContainerElements';
import Axios from 'axios';
import ShowClerkContainer from '../ShowClerkContainer';

const FindClerkContainer = () => {
    const [clerkID, setClerkID] = useState(0);
    const [clerkName, setClerkName] = useState('');
    const [clerkMobile, setClerkMobile] = useState('');
    const [isShowClerkContainerOpen, setIsShowClerkContainerOpen] = useState(false);
    const [clerkData,setClerkData] = useState([]);

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

    const findPressed = (event) => {
        event.preventDefault();

        Axios.post('http://localhost:3001/api/findClerk', {
            clerk_ID: clerkID,
            name: clerkName,
            mobile: clerkMobile,
        }).then((res) => {
            if (res.data.isValid === true) {
                setIsShowClerkContainerOpen(!isShowClerkContainerOpen);
                setClerkData(res.data.data[0])
            } else {
                alert('Clerk Not Found!');
            }
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                <Heading>
                    <h2 style={styleHeading}>Find Clerk</h2>
                </Heading>

                <Form>
                    <label style={styleLabel}>Clerk</label>
                    <hr style={styleHr}></hr>
                    <input style={styleInput} onChange={(e) => setClerkID(e.target.value)} type="number" placeholder="Enter Clerk ID" />
                    <br></br>
                    <input style={styleInput} onChange={(e) => setClerkName(e.target.value)} type="text" placeholder="Enter Clerk Name" />
                    <br></br>
                    <input style={styleInput} onChange={(e) => setClerkMobile(e.target.value)} type="text" placeholder="Enter Clerk Mobile" />
                    <br></br>

                    <ButtonAndNavLinkBox>
                        <Button onClick={findPressed}>Find</Button>
                    </ButtonAndNavLinkBox>
                </Form>
            </Container>

            {isShowClerkContainerOpen && (
                <ShowClerkContainer
                    clerkID={clerkData.Clerk_ID}
                    clerkName={clerkData.clerk_name}
                    clerkMobile={clerkData.Mobile}
                    clerkStationName={clerkData.stationName}
                    setIsShowClerkContainerOpen={setIsShowClerkContainerOpen}
                    isShowClerkContainerOpen={isShowClerkContainerOpen}
                />
            )}
        </div>
    );
};

export default FindClerkContainer;
