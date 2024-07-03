import * as actionType from '../Constants/LoginConstants.js'
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

  
export const createNewUser = (data, navigate) => async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:4444/auth/registration', data)
      if (response) {
        navigate('/login');
      }
      dispatch({
        type: actionType.CREATE_USER_SUCCESS,
        payload: {
          userData: response.data.userData
        }
      })
    } catch (error) {
      dispatch({
        type: actionType.CREATE_USER_ERROR,
        payload: {
          error: error.response.data
        }
      })
    }
  }
  
  export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }