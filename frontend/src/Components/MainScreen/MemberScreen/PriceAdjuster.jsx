import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { placeBid } from '../../../Redux/Actions/AuctionSessionActions.js';

const PriceAdjuster = ({ sessionId }) => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.auctionSession.participants || []);
  const currentUserId = useSelector((state) => state.user._id);
  const selectedProduct = useSelector((state) => state.auctionSession.selectedProduct);
  const [price, setPrice] = useState(selectedProduct?.price || 0);

  const currentBid = participants.find(p => p._id === currentUserId)?.bid || 0;
  const initialPrice = selectedProduct?.price || 0;

  const handleIncreasePrice = () => {
    setPrice(parseInt(price) + 10)
    return price
  };

  const handleDecreasePrice = () => {
    if (parseInt(price) - 10 >= initialPrice) {
      setPrice(parseInt(price) + 10)
      return price
    }
  };

  const handlePlaceBid = () => {
    if (price > initialPrice) {
      dispatch(placeBid(sessionId, price));
    } else {
      alert('New bid must be higher than the initial price');
    }
  };

  return (
    <Container>
      <Title>Current Price: ${price}</Title>
      <PriceControl>
        <PriceDisplay>New Price: ${price}</PriceDisplay>
        <ButtonContainer>
          <Button onClick={handleIncreasePrice} className="up">
            <AiFillCaretUp/>
          </Button>
          {price > initialPrice && (
            <Button onClick={handleDecreasePrice} className="down">
              <AiFillCaretDown/>
            </Button>
          )}
        </ButtonContainer>
      </PriceControl>
      {price > currentBid && <PublishButton onClick={handlePlaceBid}>Adjust</PublishButton>}
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
  border: 1vh solid #ccc;
  border-radius: 2vh;
  padding: 1vh;
  width: 55vh;
  height: 17vh;
  box-shadow: 0 4vh 6vh rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #fff;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h2`
  font-size: 2vh;
  margin-bottom: 1vh;
`;

const PriceControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1vh;
`;

const PriceDisplay = styled.div`
  font-size: 2vh;
  font-weight: bold;
  flex-grow: 1;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 3vh;
`;

const Button = styled.button`
  width: 6vh;
  height: 3vh;
  font-size: 3vh;
  border: none;
  border-radius: 1vh;
  background-color: #f0f0f0;
  cursor: pointer;
  box-shadow: 0 1vh 2vh rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  margin: 1vh 0;

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
  border-radius: 1vh;
  cursor: pointer;
  height: 3vh;
  width: 8vh;
  font-size: 2vh;
  box-shadow: 0 1vh 2vh rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #007bb5;
    transform: scale(1.05);
  }
`;

export default PriceAdjuster;
