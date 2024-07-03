import io from 'socket.io-client';
import {
  GET_USER_ID_REQUEST,
  GET_USER_ID_SUCCESS,
  GET_USER_ID_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from '../Constants/UserConstants.js';

const socket = io('http://localhost:4444');

export const getUserId = () => (dispatch) => {
  dispatch({ type: GET_USER_ID_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: GET_USER_ID_FAILURE, payload: 'Token not found in local storage' });
    return;
  }

  socket.emit('getUserId', { token }, (userId) => {
    if (userId) {
      dispatch({ type: GET_USER_ID_SUCCESS, payload: userId });
    } else {
      dispatch({ type: GET_USER_ID_FAILURE, payload: 'Failed to get user ID' });
    }
  });
};

export const updateUser = (userInfo) => (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  const token = localStorage.getItem('token');
  if (!token) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: 'Token not found in local storage' });
    return;
  }

  socket.emit('updateUser', { token, userInfo }, (response) => {
    if (response.status === 200) {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.user });
    } else {
      dispatch({ type: UPDATE_USER_FAILURE, payload: response.message });
    }
  });
};
