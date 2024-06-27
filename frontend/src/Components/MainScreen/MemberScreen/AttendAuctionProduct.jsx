import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessionById } from '../../../Redux/Actions/AuctionSessionActions.js';
import AuctionMembersList from './AuctionMembersList.jsx'
import PriceAdjuster from './PriceAdjuster.jsx'
import ProductDescription from './ProductDescription.jsx'
import ProductSummary from './ProductSummary.jsx'

export default function AttendAuctionProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.auctionSession.selectedSession);
  const loading = useSelector((state) => state.auctionSession.loading);
  const error = useSelector((state) => state.auctionSession.error);

  useEffect(() => {
    dispatch(fetchSessionById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session || !session.product) return <p>No session data available</p>;

  return (
    <div style={containerStyle}>
      <div style={{ ...componentStyle, ...productDescriptionStyle }}>
        <ProductSummary product={session.product} />
      </div>
      <div style={{ ...componentStyle, ...auctionMembersListStyle }}>
        <AuctionMembersList sessionId={id} />
      </div>
      <div style={{ ...componentStyle, ...productSummaryStyle }}>
        <ProductDescription aboutProduct={session.product.aboutProduct} />
      </div>
      <div style={{ ...componentStyle, ...priceAdjusterStyle }}>
        <PriceAdjuster initialPrice={session.product.price} />
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  position: 'relative',
  alignItems: 'center',
  backgroundColor: '#000',
};

const componentStyle = {
  // margin: '1vh',
};

const productDescriptionStyle = {
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
};

const auctionMembersListStyle = {
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
};

const productSummaryStyle = {
  position: 'absolute',
  left: 0,
  top: '50%',
  transform: 'translateY(-50%)',
};

const priceAdjusterStyle = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  margin: '1.2vh',
};