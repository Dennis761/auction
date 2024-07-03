import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FaCrown } from 'react-icons/fa6';
import { listenForParticipantsUpdates } from '../../../Redux/Actions/AuctionSessionActions.js'; 
import io from 'socket.io-client';

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
  text-align: center;
  font-size: 3vh;
  align-items: center;
  padding: 3vh;
  width: 40vh;
  margin: 3vh;
  border: 1vh solid #ccc;
  border-radius: 4vh;
  box-shadow: inset 0 0 2vh rgba(0, 0, 0, 0.1);
  background-color: #fff;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ParticipantList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const ParticipantItem = styled.li`
  padding: 1vh;
  margin: 1vh 0;
  border-radius: 2vh;
  background-color: ${props => props.isCurrentUser ? '#d0e7ff' : '#f9f9f9'};
  box-shadow: inset 0 0 1vh rgba(0, 0, 0, 0.1);
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:nth-child(odd) {
    background-color: ${props => props.isCurrentUser ? '#d0e7ff' : '#e9e9e9'};
  }
`;

const ParticipantNumber = styled.span`
  font-weight: bold;
  margin-right: 3vh;
`;

const OrganizerComponent = ({ sessionId }) => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.auctionSession.participants || []);
  const newParticipant = useSelector((state) => state.organizer.newParticipant);
  const loading = useSelector((state) => state.auctionSession.loading);
  const error = useSelector((state) => state.auctionSession.error);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { 
      const socket = io('http://localhost:4444');
      socket.emit('getUserId', { token }, (userId) => {
        console.log('User ID received from server:', userId);
        setCurrentUserId(userId);
      });

      const stopListeningUpdates = dispatch(listenForParticipantsUpdates(sessionId));

      return () => {
        if (typeof stopListeningUpdates === 'function') {
          stopListeningUpdates();
        }
      };
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (newParticipant) {
      console.log('New Participant Joined:', newParticipant);
    }
  }, [newParticipant]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log('participants', participants)
  return (
    <Container>
      <p>Top 10 Auction Participants</p>
      <ParticipantList>
        {participants.map((participant, index) => (
          <ParticipantItem 
            key={participant.userId._id}
            isCurrentUser={participant.userId._id === currentUserId}
          >
            <ParticipantNumber>{index + 1}</ParticipantNumber>
            {participant.userId._id === currentUserId && <FaCrown style={{margin: '0', padding: '0' }} />}
            {participant.userId.name} - ${participant.bid}
          </ParticipantItem>
        ))}
      </ParticipantList>
      {newParticipant && (
        <div>
          <p>New Participant Joined:</p>
          <p>Name: {newParticipant.userId.name}</p>
          <p>Bid: {newParticipant.bid}</p>
        </div>
      )}
    </Container>
  );
};

export default OrganizerComponent;
