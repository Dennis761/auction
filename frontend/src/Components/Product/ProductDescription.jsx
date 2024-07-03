import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 4vh;
  align-items: center;
  padding: 2vh;
  height: 70vh;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 1vh;
  box-shadow: 0 0 1.5vh rgba(0, 0, 0, 0.1);
`;

const AboutProduct = styled.div`
  font-size: 2.7vh;
  color: #777;
  text-align: justify;
  overflow-y: auto; 
  max-height: 70vh; 
  padding: 1vh;
  background-color: #fff;
  border-radius: 1vh;
  box-shadow: inset 0 0 1vh rgba(0, 0, 0, 0.1);
  width: 49vh; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
    }
  }
`;

const ProductDescription = ({ aboutProduct }) => (
  <Container>
    <p>Full Description: </p>
    <AboutProduct>
      {aboutProduct}
      </AboutProduct>
  </Container>
);

export default ProductDescription;
