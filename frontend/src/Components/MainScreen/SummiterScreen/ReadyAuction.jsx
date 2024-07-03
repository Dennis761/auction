import React from 'react';
import styled, { keyframes } from 'styled-components';

// Анимация для появления сообщения
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

// Дополнительная анимация для увеличения и уменьшения масштаба
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Стиль для контейнера сообщения
const MessageContainer = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 20px 30px;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  margin: 20px;
  animation: ${fadeIn} 0.5s ease-in-out, ${pulse} 2s infinite;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  word-wrap: break-word;
`;

// Компонент сообщения
const ReadyAuction = () => {
  return (
    <MessageContainer>
      Your item has been successfully sold!
    </MessageContainer>
  );
};

export default ReadyAuction;
