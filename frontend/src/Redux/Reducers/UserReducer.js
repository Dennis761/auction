import {
    GET_USER_ID_REQUEST,
    GET_USER_ID_SUCCESS,
    GET_USER_ID_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE
  } from '../Constants/UserConstants';
  
  const initialState = {
    userId: null,
    userInfo: {},
    loading: false,
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_ID_REQUEST:
      case UPDATE_USER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_USER_ID_SUCCESS:
        const userId = action.payload;
        return {
          ...state,
          loading: false,
          userId: userId
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          userInfo: action.payload
        };
      case GET_USER_ID_FAILURE:
      case UPDATE_USER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  