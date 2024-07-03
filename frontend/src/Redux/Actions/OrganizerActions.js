import io from 'socket.io-client';
import {
  CREATE_AUCTION_REQUEST,
  CREATE_AUCTION_SUCCESS,
  CREATE_AUCTION_FAILURE,
  DELETE_AUCTION_REQUEST,
  DELETE_AUCTION_SUCCESS,
  DELETE_AUCTION_FAILURE,
  START_AUCTION_TIMER_REQUEST,
  START_AUCTION_TIMER_SUCCESS,
  START_AUCTION_TIMER_FAILURE,
  UPDATE_PARTICIPANTS,
  UPDATE_REMAINING_TIME,
  AUCTION_ENDED
} from '../Constants/OrganizerConstants';

const socket = io('http://localhost:4444');

export const createAuction = (productInfo) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: CREATE_AUCTION_REQUEST });

    const token = localStorage.getItem('token');
    if (!token) {
      const error = 'Token not found in local storage';
      dispatch({ type: CREATE_AUCTION_FAILURE, payload: error });
      reject(error);
      return;
    }

    socket.emit('createAuction', { token, productInfo }, (response) => {
      if (response.status === 201) {
        dispatch({ type: CREATE_AUCTION_SUCCESS, 
          payload: 
            {
              createdSession: response.newSession,
              auctionProduct: response.auctionProduct
            } 
          });
        resolve(response.newSession);
      } else {
        dispatch({ type: CREATE_AUCTION_FAILURE, payload: response.message });
        reject(response.message);
      }
    });
  });
};

export const deleteAuction = (sessionId, navigate) => (dispatch) => {
  dispatch({ type: DELETE_AUCTION_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: DELETE_AUCTION_FAILURE, payload: 'Token not found in local storage' });
    return;
  }

  socket.emit('deleteAuction', { token, sessionId }, (response) => {
    if (response.status === 200) {
      dispatch({ type: DELETE_AUCTION_SUCCESS });
      navigate('/auction');
    } else {
      dispatch({ type: DELETE_AUCTION_FAILURE, payload: response.message });
    }
  });
};

export const startAuctionTimer = (sessionId) => (dispatch) => {
  dispatch({ type: START_AUCTION_TIMER_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: START_AUCTION_TIMER_FAILURE, payload: 'Token not found in local storage' });
    return;
  }

  socket.emit('startAuctionTimer', { token, sessionId }, (response) => {
    if (response.status === 200) {
      dispatch({ type: START_AUCTION_TIMER_SUCCESS });
      socket.on('auctionStarted', ({ endTime }) => {
        dispatch({ type: 'UPDATE_REMAINING_TIME', payload: endTime });
      });
      socket.on('updateTime', ({ remainingTime }) => {
        dispatch({ type: 'UPDATE_REMAINING_TIME', payload: remainingTime });
      });
      socket.on('auctionEnded', ({ sessionId }) => {
        dispatch({ type: 'AUCTION_ENDED', payload: sessionId });
      });
    } else {
      dispatch({ type: START_AUCTION_TIMER_FAILURE, payload: response.message });
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

export const listenForTimerUpdates = () => (dispatch) => {
  socket.on('updateTime', ({ remainingTime }) => {
    dispatch({ type: UPDATE_REMAINING_TIME, payload: remainingTime });
  });

  socket.on('auctionEnded', ({ sessionId }) => {
    dispatch({ type: AUCTION_ENDED, payload: sessionId });
  });
};
