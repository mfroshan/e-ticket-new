import React, { useState } from 'react';
import { Container, Button, Heading, Form, MessageBox } from './TicketVerificationElements';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const TicketVerification = () => {
  const navigate = useNavigate();

  const [ticketID, setTicketID] = useState(0);
  const [mobileNo, setMobileNo] = useState(0);

  const [styleHeading] = useState({
    color: '#fff',
    textAlign: 'center',
  });

  const [styleInput] = useState({
    height: '40px',
    padding: '0px 0px 0px 10px',
  });

  const [styleLabel] = useState({
    padding: '0px 0px 0px 0px',
  });

  const [styleHr] = useState({
    background: 'transparent',
    color: 'transparent',
    margin: '0',
    borderStyle: 'none',
    height: '1vw',
  });

  const [message, setMessage] = useState('');

  const verifyPressed = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:3001/api/verifyTicket', {
      ticketID,
      mobileNo,
    }).then((res) => {
      setMessage(res.data.isValid ? 'The Ticket is Valid' : 'The Ticket is Invalid');
    });
  };

  return (
    <div>
      <MessageBox message={message}>{message}</MessageBox>

      <Container message={message}>
        <Heading>
          <h2 style={styleHeading}>Verify Your Ticket</h2>
        </Heading>

        <Form>
          <label style={styleLabel}>Ticket ID</label>
          <hr style={styleHr}></hr>
          <input
            style={styleInput}
            onChange={(e) => setTicketID(e.target.value)}
            type="number"
            placeholder="Enter Ticket ID"
          />
          <br />

          <label style={styleLabel}>Mobile No</label>
          <hr style={styleHr}></hr>
          <input
            style={styleInput}
            onChange={(e) => setMobileNo(e.target.value)}
            type="number"
            placeholder="Enter Mobile No."
          />
          <br />

          <Button onClick={verifyPressed}>Verify</Button>
        </Form>
      </Container>
    </div>
  );
};

export default TicketVerification;
