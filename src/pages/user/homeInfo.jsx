import React from 'react'
import { Container, LogoAndTextBox, Logo, TextBox } from '../../components/style/HomeDivStyle'; // Assuming you have a styles folder

const styleSmallText = {
  fontSize: '13px',
};

const styleLargeText = {
  fontSize: '19px',
};
const Text = () => {
  return <p>This is a Text component.</p>;
};

const Home = () => {
  return (
    <div>
        <Container>
        <LogoAndTextBox>
          <Logo src={`tag.png`} />
          <TextBox>
            <h2 style={styleLargeText}>
              Get Train Tickets from the comfort of your home
            </h2>
            <br />
            <p style={styleSmallText}>
              Book train tickets from anywhere using the robust ticketing platform exclusively built to provide the passengers with a pleasant ticketing experience. Also, check out the mobile app RailSheba to further extend your pleasure of booking train tickets.
            </p>
          </TextBox>
        </LogoAndTextBox>

        <LogoAndTextBox>
          <Logo src={`clock.png`} />
          <TextBox>
            <h2 style={styleLargeText}>
              Train & Ticketing related information at your fingertips
            </h2>
            <br />
            <p style={styleSmallText}>
              Checkout available seats, route information, fare information on a real-time basis with Esheba Platform.
            </p>
          </TextBox>
        </LogoAndTextBox>

        <LogoAndTextBox>
          <Logo src={`lock.png`} />
          <TextBox>
            <h2 style={styleLargeText}>
              Pay Securely
            </h2>
            <br />
            <p style={styleSmallText}>
              Pay using your convenient payment option. Indian Railway supports Visa, Master, Amex & Nexus Cards, Rocket and bKash Mobile Financial Services for your convenience.
            </p>
          </TextBox>
        </LogoAndTextBox>
      </Container>
    </div>
  )
}

export default Home