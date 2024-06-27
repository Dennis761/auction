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
// } from '../Constants/AuctionSessionConstants';

// const initialState = {
//   sessions: [],
//   selectedSession: null,
//   participants: [],
//   loading: false,
//   error: null
// };

// const auctionSessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_SESSIONS_REQUEST:
//     case CREATE_SESSION_REQUEST:
//     case FETCH_SESSION_BY_ID_REQUEST:
//     case JOIN_SESSION_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };
//     case FETCH_SESSIONS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         sessions: action.payload
//       };
//     case CREATE_SESSION_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         selectedSession: action.payload
//       };
//     case FETCH_SESSION_BY_ID_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         selectedSession: action.payload,
//         participants: action.payload.participants
//       };
//     case FETCH_SESSIONS_FAILURE:
//     case CREATE_SESSION_FAILURE:
//     case FETCH_SESSION_BY_ID_FAILURE:
//     case JOIN_SESSION_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };
//     case UPDATE_PARTICIPANTS:
//       return {
//         ...state,
//         participants: action.payload
//       };
//     case JOIN_SESSION_SUCCESS:
//       return {
//         ...state,
//         loading: false
//       };
//     default:
//       return state;
//   }
// };

// export default auctionSessionReducer;
