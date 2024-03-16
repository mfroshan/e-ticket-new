import React, { useState } from 'react';
import { Container2, Heading, Table1} from './ShowClerkContainerElements';

const ShowClerkContainer = ({ clerkID, clerkName, clerkMobile, clerkStationName }) => {
    const [error, setError] = useState('');

    return (
        <Container2>
            <Heading>
                <h2 style={{ color: '#fff', textAlign: 'center' }}>Clerk Information</h2>
            </Heading>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Table1>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Mobile</td>
                    <td>Station</td>
                    {/* <td></td> */}
                </tr>
                <tr>
                    <td>{clerkID}</td>
                    <td>{clerkName}</td>
                    <td>{clerkMobile}</td>
                    <td>{clerkStationName}</td>
                    {/* <td>
                        <Button onClick={deleteClerkPressed}>Delete Clerk</Button>
                    </td> */}
                </tr>
            </Table1>
        </Container2>
    );
};

export default ShowClerkContainer;
