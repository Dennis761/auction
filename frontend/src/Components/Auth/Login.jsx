import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../Redux/Actions/LoginActions.js';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  margin-top: 1rem;
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: red;
  white-space: pre-line;
`;

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const submitUser = (e) => {
    e.preventDefault();
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    const data = { email, password };
    dispatch(loginUser(data, navigate));
  };

  return (
    <ProfileContainer>
      <h2>Login</h2>
      <Form onSubmit={submitUser}>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            placeholder="Enter your Gmail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <StyledLink to="/registration">Don't have an account? Create account</StyledLink>
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Form>
    </ProfileContainer>
  );
}
