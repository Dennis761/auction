import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSessionById, listenForParticipantsUpdates } from '../../../Redux/Actions/AuctionSessionActions.js';
import io from 'socket.io-client';

// Стили для контейнера
const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 3vh;
  align-items: center;
  padding: 5vh;
  width: 40vh;
  height-min: 30vh
  margin: 5vh;
  border: 1vh solid #ccc;
  border-radius: 4vh;
  box-shadow: inset 0 0 2vh rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

// Стили для списка участников
const ParticipantList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

// Стили для элемента участника
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

// Стили для номера участника
const ParticipantNumber = styled.span`
  font-weight: bold;
  margin-right: 3vh;
`;

const AuctionMembersList = ({ sessionId }) => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.auctionSession.participants || []);
  const loading = useSelector((state) => state.auctionSession.loading);
  const error = useSelector((state) => state.auctionSession.error);
  const [currentUserId, setCurrentUserId] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const socket = io('http://localhost:4444');
      socket.emit('getUserId', { token }, (userId) => {
        setCurrentUserId(userId);
      });

      // dispatch(fetchSessionById(sessionId));
      const stopListening = dispatch(listenForParticipantsUpdates());

      return () => {
        stopListening();
        socket.disconnect();
      };
    }
  }, [dispatch, sessionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <p>Top 10 Auction Participants</p>
      <ParticipantList>
        {participants.map((participant, index) => (
          <ParticipantItem 
            key={participant._id}
            isCurrentUser={participant._id === currentUserId}
          >
            <ParticipantNumber>{index + 1}</ParticipantNumber>
            {participant.name}
          </ParticipantItem>
        ))}
      </ParticipantList>
    </Container>
  );
};

export default AuctionMembersList;