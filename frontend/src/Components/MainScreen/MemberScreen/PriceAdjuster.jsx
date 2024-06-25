import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const PriceAdjuster = ({ initialPrice, onPublish }) => {
  const [price, setPrice] = useState(initialPrice);

  const increasePrice = () => {
    setPrice(prevPrice => prevPrice + 20);
  };

  const decreasePrice = () => {
    setPrice(prevPrice => (prevPrice - 20 >= 0 ? prevPrice - 20 : 0));
  };

  const handlePublish = () => {
    onPublish(price);
  };

  return (
    <Container>
      <Title>Adjust the Price</Title>
      <PriceControl>
        <PriceDisplay>${price}</PriceDisplay>
        <ButtonContainer>
          <Button onClick={increasePrice} className="up">
            <AiFillCaretUp/>
            </Button>
          <Button onClick={decreasePrice} className="down">
            <AiFillCaretDown/>
          </Button>
        </ButtonContainer>
      </PriceControl>
      <PublishButton onClick={handlePublish}>Publish</PublishButton>
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
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const PriceControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const PriceDisplay = styled.div`
  font-size: 28px;
  font-weight: bold;
  flex-grow: 1;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  margin: 5px 0;

  &.up {
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #45a049;
      transform: scale(1.1);
    }
  }

  &.down {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #e53935;
      transform: scale(1.1);
    }
  }
`;

const PublishButton = styled.button`
  background-color: #008cba;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #007bb5;
    transform: scale(1.05);
  }
`;

export default PriceAdjuster;
