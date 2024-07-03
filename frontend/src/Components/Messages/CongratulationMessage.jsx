import React from 'react';
import styled, { keyframes } from 'styled-components';
import Confetti from 'react-confetti';

const CongratulationMessage = ({ username }) => {
  return (
    <Container>
      <Confetti />
      <Message>
        <Title>Congratulations, {username}!</Title>
        <Subtitle>You are the winner of the auction!</Subtitle>
        <Description>
          We are thrilled to announce that you have won the auction. Thank you for your participation and we hope you enjoy your new item.
        </Description>
      </Message>
    </Container>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #f0f8ff;
  animation: ${fadeIn} 1s ease-in-out;
  position: relative;
`;

const Message = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #555555;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: #777777;
  margin-top: 0;
`;

export default CongratulationMessage;
