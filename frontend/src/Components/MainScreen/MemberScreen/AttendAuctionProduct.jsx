import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionById } from '../../../Redux/Actions/AuctionSessionActions.js';
import { listenForTimerUpdates } from '../../../Redux/Actions/OrganizerActions.js';
import { getUserId } from '../../../Redux/Actions/UserActions.js';
import styled, { keyframes } from 'styled-components';
import AuctionMembersList from './AuctionMembersList.jsx';
import PriceAdjuster from './PriceAdjuster.jsx';
import ProductDescription from '../../Product/ProductDescription.jsx';
import ProductSummary from '../../Product/ProductSummary.jsx';
import Timer from '../../Timer/Timer.jsx';
import CongratsMessage from '../../Forms/CongratulationForm.jsx';
import NoWinMessage from '../../Forms/NoWinForm.jsx';

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
  left: 6vh;
  top: 50%;
  transform: translateY(-50%);
`;

const AuctionMembersListContainer = styled.div`
  position: absolute;
  right: 6vh;
  top: 50%;
  transform: translateY(-50%);
`;

const ProductSummaryContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const PriceAdjusterContainer = styled.div`
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

const AttendAuctionProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const auctionEnded = useSelector((state) => state.organizer.auctionEnded);
  const participants = useSelector((state) => state.auctionSession.participants || []);
  const session = useSelector((state) => state.auctionSession.selectedSession);
  const product = useSelector((state) => state.auctionSession.selectedProduct);
  const loading = useSelector((state) => state.auctionSession.loading);
  const error = useSelector((state) => state.auctionSession.error);
  const [userId, setUserId] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [showNoWin, setShowNoWin] = useState(false);

  useEffect(() => {
    dispatch(fetchSessionById(id));
    setUserId(dispatch(getUserId()));
    dispatch(listenForTimerUpdates(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (auctionEnded) {
      if (participants.length > 0) {
        const highestBidder = participants[0];
        if (highestBidder.id === userId) {
          setShowCongrats(true);
        } else {
          setShowNoWin(true);
        }
      } else {
        setShowNoWin(true);
      }
    }
  }, [auctionEnded, participants, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session || !product) return <p>No session data available</p>;

  return (
    <Container>
      {auctionEnded ? (
        showCongrats ? (
          <CongratsMessage />
        ) : showNoWin ? (
          <NoWinMessage />
        ) : null
      ) : (
        <>
          <ProductDescriptionContainer>
            <ProductDescription aboutProduct={product.aboutProduct} />
          </ProductDescriptionContainer>
          <AuctionMembersListContainer>
            <AuctionMembersList sessionId={id} userId={userId} />
          </AuctionMembersListContainer>
          <ProductSummaryContainer>
            <ProductSummary product={product} />
          </ProductSummaryContainer>
          <PriceAdjusterContainer>
            <PriceAdjuster sessionId={id} />
          </PriceAdjusterContainer>
          <TimerContainer>
            <Timer initialSeconds={product.time} />
          </TimerContainer>
        </>
      )}
    </Container>
  );
};

export default AttendAuctionProduct;
