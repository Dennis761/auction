import io from 'socket.io-client';
import {
  FETCH_SESSION_DETAILS_START,
  FETCH_SESSION_DETAILS_SUCCESS,
  FETCH_SESSION_DETAILS_FAILURE,
  UPDATE_PARTICIPANTS
} from '../Constants/MembersListConstants';

const socket = io('http://localhost:4444');

export const fetchSessionDetailsStart = () => ({ type: FETCH_SESSION_DETAILS_START });
export const fetchSessionDetailsSuccess = (session) => ({ type: FETCH_SESSION_DETAILS_SUCCESS, payload: session });
export const fetchSessionDetailsFailure = (error) => ({ type: FETCH_SESSION_DETAILS_FAILURE, payload: error });

export const updateParticipants = (participants) => ({ type: UPDATE_PARTICIPANTS, payload: participants });

export const joinSession = (sessionId) => (dispatch) => {
  dispatch(fetchSessionDetailsStart());
  const token = localStorage.getItem('token');

  if (token) {
    socket.emit('joinAuction', { sessionId, token });

    socket.on('updateParticipants', (participants) => {
      dispatch(updateParticipants(participants));
    });
  } else {
    dispatch(fetchSessionDetailsFailure('Token not found in local storage'));
  }
};

export const leaveSession = (sessionId) => (dispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    socket.emit('leaveAuction', { sessionId, token });

    socket.on('updateParticipants', (participants) => {
      dispatch(updateParticipants(participants));
    });
  } else {
    console.error('Token not found in local storage');
  }
};

export const listenForParticipantsUpdates = () => (dispatch) => {
  socket.on('updateParticipants', (participants) => {
    dispatch(updateParticipants(participants));
  });

  return () => {
    socket.off('updateParticipants');
  };
};
