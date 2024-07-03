import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import ProductSummary from '../../Product/ProductSummary.jsx';
import ProductDescription from '../../Product/ProductDescription.jsx';
import AuctionMembersList from './AuctionMembersList.jsx';
import AdminPanel from './AdminPanel.jsx';
import SuccessMessage from '../../Messages/SuccessMessage.jsx'
import Timer from '../../Timer/Timer.jsx';

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
  height: 100vh;
  justify-content: center;
  position: relative;
  align-items: center;
  background-color: #000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ProductDescriptionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const AuctionMembersListContainer = styled.div`
  position: absolute;
  right: 6vh;
  top: 50%;
  transform: translateY(-50%);
`;

const ProductSummaryContainer = styled.div`
  position: absolute;
  left: 6vh;
  top: 50%;
  transform: translateY(-50%);
`;

const AdminPanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 1.2vh;
`;

const TimerContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: calc(1% - 1vh);
  top: calc(10% - 3vh);
`;

export default function SummitAuctionProduct() {
  const { id } = useParams();
  const session = useSelector((state) => state.organizer.createdSession);
  const product = useSelector((state) => state.organizer.auctionProduct);
  const auctionEnded = useSelector((state) => state.organizer.auctionEnded);
  const loading = useSelector((state) => state.organizer.loading);
  const error = useSelector((state) => state.organizer.error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session || !product) return <p>No session data available</p>;

  return (
    <Container>
      {auctionEnded ? (
        <SuccessMessage />
      ) : (
        <>
          <ProductDescriptionContainer>
            <ProductSummary product={product} />
          </ProductDescriptionContainer>
          <AuctionMembersListContainer>
            <AuctionMembersList sessionId={id} />
          </AuctionMembersListContainer>
          <ProductSummaryContainer>
            <ProductDescription aboutProduct={product.aboutProduct} />
          </ProductSummaryContainer>
          <AdminPanelContainer>
            <AdminPanel sessionId={id} />
          </AdminPanelContainer>
          <TimerContainer>
            <Timer initialSeconds={product.time} />
          </TimerContainer>
        </>
      )}
    </Container>
  );
}
