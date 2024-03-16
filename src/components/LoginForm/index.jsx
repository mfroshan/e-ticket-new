import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  Heading,
  Form,
  NavLink,
  ButtonAndNavLinkBox,
  MessageBox
} from './LoginFormElements';
import Axios from 'axios';

import { useAuth } from '../../hooks/useAuth';


const LoginForm = (props) => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { setPassengerData }  = useAuth();
  
  const validate = () => {
    let isValid = true;

    if (!email.includes('@') || !email.includes('.com')) {
      setEmailError('Invalid Email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Password Required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const loginPressed = (event) => {
    event.preventDefault();
  
    const isValid = validate();
    if (isValid) {
      Axios.post('http://localhost:3001/api/loginPassenger', {
        email: email,
        password: password,
      }).then((res) => {
        if (res.data.isValid) {
          console.log(res.data);
          // props.setPassengerMail(email);
          // props.setPassengerNid(res.data.nid);
          // props.setPassengerName(res.data.name);
          // props.setPassengerMobile(res.data.mobile);
          // props.setPassengerPassword(res.data.password);
          setPassengerData({
            email: email,
            nid: res.data.nid,
            name: res.data.name,
            mobile: res.data.mobile,
            password: res.data.password,
          });
          setEmail('-1');
        } else {
          setPasswordError('Incorrect Credentials.');
        }
      });
    }
  };
  

  useEffect(() => {
    if (email !== '' && email === '-1') {
      history('/user-home');
    }
  }, [email, history]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '80px 0px 80px 0px' }}>
      <MessageBox emailError={emailError} passwordError={passwordError}>
        {emailError}
        {emailError !== '' && <br />}
        {passwordError}
      </MessageBox>

      <Container>
        <Heading>
          <h2 style={{ color: '#fff', textAlign: 'center' }}>User Login</h2>
        </Heading>

        <Form>
          <label>Email</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
          />
          <br />

          <label>Password</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />

          <ButtonAndNavLinkBox>
            <Button onClick={loginPressed}>Login</Button>
            {/* <NavLink to="/login" activeStyle>
              Forgot Password?
            </NavLink> */}
          </ButtonAndNavLinkBox>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
