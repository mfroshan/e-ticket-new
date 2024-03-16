import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container2, Heading, UserInfoContainer, Container1, InfoDiv } from './DashboardUserContainerElements';
import Axios from 'axios';
import JourneyUserContainer from '../JourneyUserContainer';

const DashboardUserContainer = (props) => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [styleHeading] = useState({
    color: '#fff',
    textAlign: 'center',
  });
  const [styleInput] = useState({
    height: '40px',
    padding: '0px 0px 0px 10px',
  });
  const [styleLabel] = useState({
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '5px 0px 5px 0px',
  });
  const [styleText] = useState({
    fontSize: '20px',
    padding: '5px 0px 5px 0px',
  });
  const [styleHr] = useState({
    background: 'transparent',
    color: 'transparent',
    margin: '0',
    borderStyle: 'none',
    height: '1vw',
  });

  useEffect(() => {
    Axios.post('http://localhost:3001/api/getPassengerJourneys', {
      nid: props.passengerNid,
    }).then((res) => {
      const journeyItems = res.data.map((journey) => ({
        Ticket_ID: journey.Ticket_ID,
        Train_ID: journey.Train_ID,
        Coach_ID: journey.Coach_ID,
        No_of_seats: journey.No_of_seats,
        Start_position: journey.Start_position,
        End_position: journey.End_position,
        Journey_time: journey.Journey_time,
        Issue_time: journey.Issue_time,
      }));
      setItems(journeyItems);
    });
  }, [props.passengerNid]);

  const loginPressed = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:3001/api/loginPassenger', {
      email: props.passengerMail,
      password: props.passengerPassword,
    }).then((res) => {
      if (res.data.isValid) {
        props.setPassengerMail(props.passengerMail);
        props.setPassengerNid(res.data.nid);
        props.setPassengerName(res.data.name);
        props.setPassengerMobile(res.data.mobile);
        props.setPassengerPassword(res.data.password);
        setEmail('-1');
      }
    });
  };

  const setEmail = (data) => {
    props.history.push({ pathname: '/home-user' });
  };

  return (
    <div>
      <Container1>
        <Heading>
          <h2 style={styleHeading}>Personal Information</h2>
        </Heading>

        <UserInfoContainer>
          <InfoDiv>
            <label style={styleLabel}>Name:</label>
            <text style={styleText}>{props.passengerName}</text>
          </InfoDiv>

          <InfoDiv>
            <label style={styleLabel}>Email:</label>
            <text style={styleText}>{props.passengerMail}</text>
          </InfoDiv>

          {/* <InfoDiv>
            <label style={styleLabel}>National ID:</label>
            <text style={styleText}>{props.passengerNid}</text>
          </InfoDiv> */}

          <InfoDiv>
            <label style={styleLabel}>Mobile No:</label>
            <text style={styleText}>0{parseInt(props.passengerMobile)}</text>
          </InfoDiv>
        </UserInfoContainer>
      </Container1>

      <Container2>
        <Heading>
          <h2 style={styleHeading}>Upcoming Journeys</h2>
        </Heading>

        {items.map((item, index) => (
          <JourneyUserContainer key={index} item={item} />
        ))}
      </Container2>
    </div>
  );
};

export default DashboardUserContainer;
