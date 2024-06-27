// import axios from 'axios';
// import io from 'socket.io-client';
// import {
//   FETCH_SESSIONS_REQUEST,
//   FETCH_SESSIONS_SUCCESS,
//   FETCH_SESSIONS_FAILURE,
//   CREATE_SESSION_REQUEST,
//   CREATE_SESSION_SUCCESS,
//   CREATE_SESSION_FAILURE,
//   FETCH_SESSION_BY_ID_REQUEST,
//   FETCH_SESSION_BY_ID_SUCCESS,
//   FETCH_SESSION_BY_ID_FAILURE,
//   JOIN_SESSION_REQUEST,
//   JOIN_SESSION_SUCCESS,
//   JOIN_SESSION_FAILURE,
//   UPDATE_PARTICIPANTS
// } from '../Constants/AuctionSessionConstants.js';

// const socket = io('http://localhost:4444');

// // Fetch All Sessions
// export const fetchSessions = () => async (dispatch) => {
//   try {
//     dispatch({ type: FETCH_SESSIONS_REQUEST });
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token not found in local storage');
//     }

//     const response = await axios.get('http://localhost:4444/auctions', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     dispatch({ type: FETCH_SESSIONS_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: FETCH_SESSIONS_FAILURE, payload: error.message });
//   }
// };

// // Create Session 
// export const createSession = (sessionData) => async (dispatch) => {
//   try {
//     dispatch({ type: CREATE_SESSION_REQUEST });
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token not found in local storage');
//     }

//     const response = await axios.post('http://localhost:4444/auctions', sessionData, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     dispatch({ type: CREATE_SESSION_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: CREATE_SESSION_FAILURE, payload: error.message });
//   }
// };

// // Fetch Session by ID
// export const fetchSessionById = (id) => async (dispatch) => {
//   dispatch({ type: FETCH_SESSION_BY_ID_REQUEST });
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token not found in local storage');
//     }

//     const response = await axios.get(`http://localhost:4444/auctions/${id}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     dispatch({ type: FETCH_SESSION_BY_ID_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: FETCH_SESSION_BY_ID_FAILURE, payload: error.message });
//   }
// };

// // Join Session
// export const joinSession = (sessionId) => (dispatch) => {
//   dispatch({ type: JOIN_SESSION_REQUEST });
//   const token = localStorage.getItem('token');

//   if (token) {
//     socket.emit('joinAuction', { sessionId, token });

//     socket.on('updateParticipants', (participants) => {
//       dispatch({ type: UPDATE_PARTICIPANTS, payload: participants });
//       dispatch({ type: JOIN_SESSION_SUCCESS });
//     });
//   } else {
//     dispatch({ type: JOIN_SESSION_FAILURE, payload: 'Token not found in local storage' });
//   }
// };

// // Leave Session
// export const leaveSession = (sessionId) => (dispatch) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     socket.emit('leaveAuction', { sessionId, token });

//     socket.on('updateParticipants', (participants) => {
//       dispatch({ type: UPDATE_PARTICIPANTS, payload: participants });
//     });
//   } else {
//     console.error('Token not found in local storage');
//   }
// };

// // Listen for Participants Updates
// export const listenForParticipantsUpdates = () => (dispatch) => {
//   socket.on('updateParticipants', (participants) => {
//     dispatch({ type: UPDATE_PARTICIPANTS, payload: participants });
//   });

//   return () => {
//     socket.off('updateParticipants');
//   };
// };
