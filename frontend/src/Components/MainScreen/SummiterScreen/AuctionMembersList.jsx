import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FaCrown } from 'react-icons/fa';
import { listenForParticipantsUpdates } from '../../../Redux/Actions/OrganizerActions';
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
  padding: 5vh;
  width: 40vh;
  margin: 5vh;
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

const AuctionMembersList = () => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.organizer.participants);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { 
      const socket = io('http://localhost:4444');
      socket.emit('getUserId', { token }, (userId) => {
        setCurrentUserId(userId);
      });

      const stopListening = dispatch(listenForParticipantsUpdates());

      return () => {
        if (typeof stopListening === 'function') {
          stopListening();
        }
      };
    }
  }, [dispatch]);

  return (
    <Container>
      <h2>Top 10 Auction Participants</h2>
      <ParticipantList>
        {participants.map((participant, index) => (
          <ParticipantItem 
            key={participant.userId._id}
            isCurrentUser={participant.userId._id === currentUserId}
          >
            <ParticipantNumber>{index + 1}</ParticipantNumber>
            {participant.userId._id === currentUserId && <FaCrown style={{margin: '0', padding: '0' }} />}
            {participant.userId.name}: ${participant.bid}
          </ParticipantItem>
        ))}
      </ParticipantList>
    </Container>
  );
};

export default AuctionMembersList;
