import axios from 'axios';
import {
  FETCH_SESSIONS_REQUEST,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_FAILURE,
  FETCH_SESSION_BY_ID_REQUEST,
  FETCH_SESSION_BY_ID_SUCCESS,
  FETCH_SESSION_BY_ID_FAILURE,
  JOIN_SESSION_REQUEST,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_FAILURE
} from '../Constants/AuctionSessionConstants.js';

// Fetch All Sessions
export const fetchSessions = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SESSIONS_REQUEST });
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await axios.get('http://localhost:4444/auctions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const {data} = response
    dispatch({ type: FETCH_SESSIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SESSIONS_FAILURE, payload: error.message });
  }
};

// Create Session 
export const createSession = (sessionData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SESSION_REQUEST });
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await axios.post('http://localhost:4444/auctions', sessionData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const { product } = response.data
    if (data) {
      dispatch({ type: CREATE_SESSION_SUCCESS, payload: product });
    } else {
      dispatch({ type: CREATE_SESSION_FAILURE, payload: 'No data found' });
    }
  } catch (error) {
    dispatch({ type: CREATE_SESSION_FAILURE, payload: error.message });
  }
};

// Fetch Session by ID
export const fetchSessionById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SESSION_BY_ID_REQUEST });
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const { data } = await axios.get(`http://localhost:4444/auctions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (data) {
      dispatch({ type: FETCH_SESSION_BY_ID_SUCCESS, payload: data });
    } else {
      dispatch({ type: FETCH_SESSION_BY_ID_FAILURE, payload: 'No data found' });
    }
  } catch (error) {
    dispatch({ type: FETCH_SESSION_BY_ID_FAILURE, payload: error.message });
  }
};

// Join Session
// export const joinSession = (id, userData) => async (dispatch) => {
//   dispatch({ type: JOIN_SESSION_REQUEST });
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Token not found in local storage');
//     }
    
//     const { data } = await axios.post(`http://localhost:4444/auctions/${id}/join`, userData);
//     if (data) {
//       dispatch({ type: JOIN_SESSION_SUCCESS, payload: data });
//     } else {
//       dispatch({ type: JOIN_SESSION_FAILURE, payload: 'No data found' });
//     }
//   } catch (error) {
//     dispatch({ type: JOIN_SESSION_FAILURE, payload: error.message });
//   }
// };
