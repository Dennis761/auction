import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh;
  width: 40vh;
  font-size: 2vh;
  margin: auto;
  background-color: #fff;
  border-radius: 1vh;
  box-shadow: 0 0 1.5vh rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1vh;
  margin-bottom: 1vh;
  position: relative;
`;

const Item = styled.div`
  margin: 1vh 0;
  padding: 1vh;
  border-bottom: 0.1vh solid #ddd;
`;

const Label = styled.span`
  font-size: 1.8vh;
  color: #333;
  font-weight: bold;
`;

const Value = styled.span`
  font-size: 1.6vh;
  color: #555;
`;

const Button = styled.button`
  margin: 2vh 0;
  padding: 2vh;
  border: none;
  border-radius: 1vh;
  cursor: pointer;
  font-size: 2vh;
`;

const InfoButton = styled(Button)`
  background-color: #007bff;
  color: white;
  width: 4vh;
  height: 4vh;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vh;
  position: absolute;
  top: 1.3vh;
  right: 1vh;
  border: 0.2vh solid white;
`;

const CloseButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  width: 3vh;
  height: 3vh;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vh;
  position: absolute;
  top: 1vh;
  right: 1vh;
  border: 0.2vh solid white;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const DescriptionContainer = styled.div`
  position: relative;
  background-color: #fff;
  padding: 2vh;
  border-radius: 1vh;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 0 1.5vh rgba(0, 0, 0, 0.5);
`;

const ProductSummary = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);
  const { title, price, location, country, time, description, imageURL } = product

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <>
    <Container style={{margin: '1.3vh'}}>
      <p>Auction: "{title}"</p>
    </Container>
    <Container>
      <Image src={imageURL} alt="Product Image" />
      <InfoButton onClick={toggleDescription}>i</InfoButton>
      <Item>
        <Label>Price:</Label> <Value>${price}</Value>
      </Item>
      <Item>
        <Label>Location:</Label> <Value>{location}</Value>
      </Item>
      <Item>
        <Label>Country:</Label> <Value>{country}</Value>
      </Item>
      <Item>
        <Label>Time:</Label> <Value>{time} seconds</Value>
      </Item>
      {showDescription && (
        <Overlay>
          <DescriptionContainer>
            <CloseButton onClick={toggleDescription}>×</CloseButton>
            <Label>Description:</Label>
            <Value>{description}</Value>
          </DescriptionContainer>
        </Overlay>
      )}
    </Container>
    </>
  );
};

export default ProductSummary;
