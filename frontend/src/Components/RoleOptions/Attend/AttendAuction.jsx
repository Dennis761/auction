import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSessions } from '../../../Redux/Actions/AuctionSessionActions.js';
import ProductCarousel from '../../Models/ProductCarousel';
import image from '../../../Images/AllAvailableAuctionPicture.jpg';

export default function AttendAuction() {
  const dispatch = useDispatch();

  const auctionSessions = useSelector((state) => state.auctionSession);
  const { sessions = [], loading, error } = auctionSessions;

  useEffect(() => {
    dispatch(fetchSessions());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(${image})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      height: '100vh',
      padding: '20px',
    }}>
      <h2 style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '7vh',
        textShadow: `
        -0.15vh -0.15vh 0 #000,  
         0.15vh -0.15vh 0 #000,
        -0.15vh  0.15vh 0 #000,
         0.15vh  0.15vh 0 #000,
        -0.15vh -0.15vh 0 #000,
         0.15vh -0.15vh 0 #000,
        -0.15vh  0.15vh 0 #000,
         0.15vh  0.15vh 0 #000`
      }}>
        Current open auction
      </h2>
      <ProductCarousel products={sessions} />
    </div>
  );
}
