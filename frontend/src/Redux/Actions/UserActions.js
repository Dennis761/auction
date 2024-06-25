import * as actionType from '../Constants/UserConstants.js'
import axios from 'axios'

export const loginUser = (data, navigate) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:4444/auth/login', data);
        const { token, ...userData } = response.data;
        localStorage.setItem('token', token);

        if (response.data) {
            navigate('/auction');
        }
        
        dispatch({
            type: actionType.LOGIN_USER_SUCCESS,
            payload: {
                loginData: userData,
                headerAndFooterState: true
            }
        });
    } catch (error) {
        dispatch({
            type: actionType.LOGIN_USER_ERROR,
            payload: {
              error: error
            }
        });
    }
  }

  export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }
// import axios from 'axios';
// import {
//   FETCH_USERS_REQUEST,
//   FETCH_USERS_SUCCESS,
//   FETCH_USERS_FAILURE,
//   USER_JOINED,
//   USER_LEFT
// } from './UserConstants';

// // Fetch Users
// export const fetchUsers = () => async (dispatch) => {
//   dispatch({ type: FETCH_USERS_REQUEST });
//   try {
//     const { data } = await axios.get('/users');
//     if (data) {
//       dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
//     } else {
//       dispatch({ type: FETCH_USERS_FAILURE, payload: 'No data found' });
//     }
//   } catch (error) {
//     dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
//   }
// };

// // User Joined
// export const userJoined = (userData) => (dispatch) => {
//   dispatch({ type: USER_JOINED, payload: userData });
// };

// // User Left
// export const userLeft = (userId) => (dispatch) => {
//   dispatch({ type: USER_LEFT, payload: userId });
// };
