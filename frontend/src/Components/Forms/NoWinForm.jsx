import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  text-align: center;
`;

const NoWinMessage = () => {
  return (
    <MessageContainer>
      <p>Thank you for participating in the auction!</p>
      <p>Unfortunately, you did not win any items this time.</p>
      <p>Better luck next time!</p>
    </MessageContainer>
  );
};

export default NoWinMessage;
