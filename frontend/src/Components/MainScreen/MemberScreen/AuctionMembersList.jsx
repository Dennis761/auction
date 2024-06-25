import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSessionDetails, listenForParticipantsUpdates } from '../../../Redux/Actions/MembersListAction.js';
// Стили для контейнера
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border: 2px solid #ccc;
  border-radius: 15px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
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
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  background-color: ${props => props.isCurrentUser ? '#d0e7ff' : '#f9f9f9'}; /* Изменение цвета фона для текущего пользователя */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  font-family: 'Comic Sans MS', 'Comic Sans', cursive; /* Используйте необычный стиль шрифта */
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:nth-child(odd) {
    background-color: ${props => props.isCurrentUser ? '#d0e7ff' : '#e9e9e9'}; /* Изменение цвета фона для текущего пользователя */
  }
`;

// Стили для номера участника
const ParticipantNumber = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const AuctionMembersList = ({ sessionId }) => {
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.membersList.participants);
  const loading = useSelector((state) => state.membersList.loading);
  const error = useSelector((state) => state.membersList.error);
  const currentUserId = localStorage.getItem('userId'); // Получение текущего ID пользователя из локального хранилища

  useEffect(() => {
    dispatch(fetchSessionDetails(sessionId));
    const stopListening = dispatch(listenForParticipantsUpdates());

    return () => {
      stopListening();
    };
  }, [dispatch, sessionId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <h2>Participants in Auction {sessionId}</h2>
      <ParticipantList>
        {participants.map((participant, index) => (
          <ParticipantItem 
            key={participant._id}
            isCurrentUser={participant._id === currentUserId} // Передача пропса для проверки текущего пользователя
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