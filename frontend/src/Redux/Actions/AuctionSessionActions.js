import io from 'socket.io-client';
import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  FETCH_SESSION_BY_ID_REQUEST,
  FETCH_SESSION_BY_ID_SUCCESS,
  FETCH_SESSION_BY_ID_FAILURE,
  JOIN_SESSION_REQUEST,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_FAILURE,
  LEAVE_SESSION_REQUEST,
  LEAVE_SESSION_SUCCESS,
  LEAVE_SESSION_FAILURE,
  PLACE_BID_REQUEST,
  PLACE_BID_SUCCESS,
  PLACE_BID_FAILURE,
  UPDATE_PARTICIPANTS,
  UPDATE_REMAINING_TIME,
  AUCTION_ENDED
} from '../Constants/AuctionSessionConstants.js';

const socket = io('http://localhost:4444');

export const fetchSessions = () => (dispatch) => {
  dispatch({ type: FETCH_SESSIONS_REQUEST });

  socket.emit('fetchSessions', (response) => {
    if (response.status === 200) {
      dispatch({ type: FETCH_SESSIONS_SUCCESS, payload: response.findProducts });
    } else {
      dispatch({ type: FETCH_SESSIONS_FAILURE, payload: response.message });
    }
  });
};

export const fetchSessionById = (sessionId) => (dispatch) => {
  dispatch({ type: FETCH_SESSION_BY_ID_REQUEST });
  socket.emit('fetchSessionById', { sessionId }, (response) => {
    if (response.status === 200) {
      dispatch({ type: FETCH_SESSION_BY_ID_SUCCESS, 
        payload: {
          session: response.session,
          product: response.product
        } 
      });
      socket.on('updateTime', ({ remainingTime }) => {
        dispatch({ type: UPDATE_REMAINING_TIME, payload: remainingTime });
      });
      socket.on('auctionEnded', ({ sessionId }) => {
        dispatch({ type: AUCTION_ENDED, payload: sessionId });
      });
    } else {
      dispatch({ type: FETCH_SESSION_BY_ID_FAILURE, payload: response.message });
    }
  });
};

export const joinSession = (sessionId, bid) => (dispatch, getState) => {
  dispatch({ type: JOIN_SESSION_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: JOIN_SESSION_FAILURE, payload: 'Token not found in local storage' });
    return;
  }
  
  const userId = getState().user.userId;

  socket.emit('joinAuction', { sessionId, token, bid }, (response) => {
    if (response.status === 200) {
      dispatch({ type: JOIN_SESSION_SUCCESS, payload: userId });
      dispatch({ type: UPDATE_PARTICIPANTS, payload: response.participants });
    } else {
      dispatch({ type: JOIN_SESSION_FAILURE, payload: response.message });
    }
  });
};

export const leaveSession = (sessionId) => (dispatch, getState) => {
  dispatch({ type: LEAVE_SESSION_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: LEAVE_SESSION_FAILURE, payload: 'Token not found in local storage' });
    return;
  }

  const userId = getState().user.userId;

  socket.emit('leaveAuction', { sessionId, token }, (response) => {
    if (response.status === 200) {
      dispatch({ type: LEAVE_SESSION_SUCCESS, payload: userId });
      dispatch({ type: UPDATE_PARTICIPANTS, payload: response.participants });
    } else {
      dispatch({ type: LEAVE_SESSION_FAILURE, payload: response.message });
    }
  });
};

export const listenForParticipantsUpdates = () => (dispatch) => {
  const updateParticipants = (participants) => {
    dispatch({ type: UPDATE_PARTICIPANTS, payload: participants });
  };

  socket.on('updateParticipants', updateParticipants);

  return () => {
    socket.off('updateParticipants', updateParticipants);
  };
};

export const placeBid = (sessionId, bid) => (dispatch) => {
  dispatch({ type: PLACE_BID_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: PLACE_BID_FAILURE, payload: 'Token not found in local storage' });
    return;
  }

  socket.emit('placeBid', { token, sessionId, bid }, (response) => {
    if (response.status === 200) {
      dispatch({ type: PLACE_BID_SUCCESS, payload: { userId: response.userId, bid: response.bid } });
      dispatch({ type: UPDATE_PARTICIPANTS, payload: response.participants });
    } else {
      dispatch({ type: PLACE_BID_FAILURE, payload: response.message });
    }
  });
};

export const listenForTimerUpdates = (sessionId) => (dispatch) => {
  socket.on('updateTime', ({ remainingTime }) => {
    dispatch({ type: UPDATE_REMAINING_TIME, payload: remainingTime });
  });

  socket.on('auctionEnded', ({ sessionId }) => {
    dispatch({ type: AUCTION_ENDED, payload: sessionId });
  });

  return () => {
    socket.off('updateTime');
    socket.off('auctionEnded');
  };
};
