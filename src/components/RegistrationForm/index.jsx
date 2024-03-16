import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  Heading,
  Form,
  NavLink,
  MessageBox,
  ButtonAndNavLinkBox,
} from './RegistrationFormElements';
import Axios from 'axios';

const RegistrationForm = () => {
  const history = useNavigate();

  const [name, setName] = useState('');
  const [nid, setNid] = useState(0);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [nidError, setNidError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validate = () => {
    let isValid = true;

    if (name === '') {
      setNameError('Name Required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (nid === 0) {
      setNidError('NID Required.');
      isValid = false;
    } else {
      setNidError('');
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setEmailError('Invalid Email.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (mobile === 0) {
      setMobileError('Mobile No Required.');
      isValid = false;
    } else {
      setMobileError('');
    }

    if (password === '') {
      setPasswordError('Password Required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('Confirm Password did not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const signUpPressed = (event) => {
    event.preventDefault();

    let isValid = validate();
    if (isValid) {
      Axios.post('http://localhost:3001/api/registerPassenger', {
        name,
        nid,
        email,
        mobile,
        password,
      }).then((res) => {
        if (res.data.isValid) {
          setEmail('-1');
        } else {
          setPasswordError('Invalid Credentials.');
        }
      });
    }
  };

  useEffect(() => {
    if (email !== '' && email === '-1') {
      history('/home-user');
    }
  }, [email, history]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '80px 0px 80px 0px' }}>
      <MessageBox
        nameError={nameError}
        nidError={nidError}
        emailError={emailError}
        mobileError={mobileError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
      >
        {nameError}
        {nameError !== '' && <br />}
        {nidError}
        {nidError !== '' && <br />}
        {emailError}
        {emailError !== '' && <br />}
        {mobileError}
        {mobileError !== '' && <br />}
        {passwordError}
        {passwordError !== '' && <br />}
        {confirmPasswordError}
      </MessageBox>
      <Container>
        <Heading>
          <h2 style={{ color: '#fff', textAlign: 'center' }}>User Registration</h2>
        </Heading>

        <Form>
          <label>Name</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Full name"
          />
          <br />

          <label>NID</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setNid(e.target.value)}
            type="number"
            placeholder="Enter National ID"
          />
          <br />

          <label>Email</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
          />
          <br />

          <label>Mobile</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setMobile(e.target.value)}
            type="number"
            placeholder="Enter Mobile No"
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

          <label>Confirm Password</label>
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />
          <input
            style={{ height: '40px', padding: '0px 0px 0px 10px' }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <hr style={{ background: 'transparent', color: 'transparent', margin: '0', borderStyle: 'none', height: '1vw' }} />

          <ButtonAndNavLinkBox>
            <Button onClick={signUpPressed}>Sign Up</Button>
            <NavLink to="/login" activeStyle>
              Already Registered?
            </NavLink>
          </ButtonAndNavLinkBox>
        </Form>
      </Container>
    </div>
  );
};

export default RegistrationForm;
