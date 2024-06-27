import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 4vh;
  align-items: center;
  padding: 2vh;
  max-width: 80vh;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 1vh;
  box-shadow: 0 0 1.5vh rgba(0, 0, 0, 0.1);
`;

const AboutProduct = styled.div`
  font-size: 2vh;
  color: #777;
  text-align: justify;
  overflow-y: auto; /* Включаем вертикальную прокрутку */
  max-height: 50vh; 
  padding: 1vh;
  background-color: #fff;
  border-radius: 1vh;
  box-shadow: inset 0 0 1vh rgba(0, 0, 0, 0.1);
  width: 40vh; /* Ширина 100% от контейнера */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  
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
