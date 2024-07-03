import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, clearError } from '../../Redux/Actions/LoginActions.js';
import styled from 'styled-components';
 
const ProfileContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  margin-left: 20px;
  font-size: 12px;
  color: red;
  white-space: pre-line;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue;
  display: block;
  margin-top: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.createNewUser);

  const submitNewUser = () => {
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    const data = { name, email, country, password };
    dispatch(createNewUser(data, navigate));
  };

  return (
    <ProfileContainer>
      <h2>Registration</h2>
      <FormGroup>
        <Label htmlFor="name">User name:</Label>
        <Input
          id="name"
          placeholder='Enter user name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ErrorMessage>
          {error && error.find(err => err.path === 'name')?.msg}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Gmail:</Label>
        <Input
          id="email"
          placeholder='Enter user Gmail'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ErrorMessage>
          {error && error.find(err => err.path === 'email')?.msg}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="country">Country:</Label>
        <Input
          id="country"
          placeholder='Enter user country'
          type='text'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <ErrorMessage>
          {error && error.find(err => err.path === 'country')?.msg}
        </ErrorMessage>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          placeholder='Enter user password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorMessage>
          {error && error.find(err => err.path === 'password')?.msg}
        </ErrorMessage>
      </FormGroup>

      <CenteredContainer>
        <StyledLink to='/login'>
          If you have an account. Login
        </StyledLink>
        <Button onClick={submitNewUser}>Register</Button>
      </CenteredContainer>
    </ProfileContainer>
  );
}
