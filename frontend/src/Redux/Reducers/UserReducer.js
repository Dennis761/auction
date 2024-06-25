import * as actionType from '../Constants/UserConstants.js';

const userInfoReducer = (state = { loginData: {}, error: null }, action) => {
    switch (action.type) {
        case actionType.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginData: action.payload.loginData,
                headerAndFooterState: action.payload.headerAndFooterState,
                error: null
            };
        case actionType.LOGIN_USER_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        // case actionType.LOGOUT_USER_SUCCESS:
        //     return {
        //         ...state,
        //         headerAndFooterState: action.payload.headerAndFooterState,
        //         error: null
        //     };
        // case actionType.LOGOUT_USER_ERROR:
        //     return {
        //         ...state,
        //         error: action.payload.error
        //     };
        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default userInfoReducer
// import {
//     FETCH_USERS_REQUEST,
//     FETCH_USERS_SUCCESS,
//     FETCH_USERS_FAILURE,
//     USER_JOINED,
//     USER_LEFT
//   } from '../Constants/UserConstants';
  
//   const initialState = {
//     users: [],
//     loading: false,
//     error: null,
//   };
  
//   const UserReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_USERS_REQUEST:
//         return { ...state, loading: true };
//       case FETCH_USERS_SUCCESS:
//         return { ...state, loading: false, users: action.payload };
//       case FETCH_USERS_FAILURE:
//         return { ...state, loading: false, error: action.payload };
//       case USER_JOINED:
//         return { ...state, users: [...state.users, action.payload] };
//       case USER_LEFT:
//         return { ...state, users: state.users.filter(user => user.id !== action.payload) };
//       default:
//         return state;
//     }
//   };
  
//   export default UserReducer;
  