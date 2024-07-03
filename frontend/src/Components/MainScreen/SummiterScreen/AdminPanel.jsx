import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { startAuctionTimer, deleteAuction } from '../../../Redux/Actions/OrganizerActions.js';
import ReadyAuction from './ReadyAuction.jsx'; 

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Panel = styled.div`
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 1vh;
  width: 44vh;
  margin: 20px auto;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  background-color: ${props => props.primary ? '#007bff' : '#dc3545'};
  color: white;

  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#c82333'};
  }
`;

const AdminPanel = ({ sessionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auctionStarted, setAuctionStarted] = useState(false);
  console.log('auctionStarted', auctionStarted)
  const handleStartAuction = () => {
    dispatch(startAuctionTimer(sessionId));
  };

  const handleDeleteAuction = (sessionId) => {
    dispatch(deleteAuction(sessionId, navigate));
  };

  return (
    <div>
      {auctionStarted ? (
        <ReadyAuction />
        ) : (
          <Panel>
            <h2>Admin Panel</h2>
            <Button onClick={() => {
              setAuctionStarted(true);
              handleStartAuction()
              }} primary>
                Start Auction
              </Button>
            <Button onClick={() => handleDeleteAuction(sessionId)}>Cancel</Button>
          </Panel>
      )}
      </div>
    );
};

export default AdminPanel;
