import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MessageContainer = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  margin: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SuccessMessage = () => {
  return (
    <MessageContainer>
      Your item has been successfully sold!
    </MessageContainer>
  );
};

export default SuccessMessage;
