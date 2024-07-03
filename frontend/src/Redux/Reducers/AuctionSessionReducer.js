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
  UPDATE_PARTICIPANTS,
  PLACE_BID_REQUEST,
  PLACE_BID_SUCCESS,
  PLACE_BID_FAILURE,
  UPDATE_REMAINING_TIME,
  AUCTION_ENDED
} from '../Constants/AuctionSessionConstants.js';

const initialState = {
  sessions: [],
  selectedSession: null,
  participants: [],
  loading: false,
  error: null,
  remainingTime: null,
  auctionEnded: false
};

const auctionSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS_REQUEST:
    case FETCH_SESSION_BY_ID_REQUEST:
    case JOIN_SESSION_REQUEST:
    case LEAVE_SESSION_REQUEST:
    case PLACE_BID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload,
      };
    case FETCH_SESSION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedSession: action.payload.session,
        selectedProduct: action.payload.product,
        participants: action.payload.session.participants,
      };
    case FETCH_SESSIONS_FAILURE:
    case FETCH_SESSION_BY_ID_FAILURE:
    case JOIN_SESSION_FAILURE:
    case LEAVE_SESSION_FAILURE:
    case PLACE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        participants: [...state.participants, action.payload],
      };
    case LEAVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        participants: state.participants.filter(
          (participant) => participant.userId !== action.payload.userId
        ),
      };
    case UPDATE_PARTICIPANTS:
      const sortedParticipants = action.payload.sort((a, b) => b.bid - a.bid);
      return {
        ...state,
        participants: sortedParticipants.length > 10 ? sortedParticipants.slice(0, 10) : sortedParticipants,
      };
    case PLACE_BID_SUCCESS:
      return {
        ...state,
        loading: false,
        participants: state.participants.map((participant) =>
          participant.userId === action.payload.userId
            ? { ...participant, bid: action.payload.bid }
            : participant
        ).sort((a, b) => b.bid - a.bid),
      };
    case UPDATE_REMAINING_TIME:
      return {
        ...state,
        remainingTime: action.payload
      };
    case AUCTION_ENDED:
      return {
        ...state,
        auctionEnded: true
      };
    default:
      return state;
  }
};

export default auctionSessionReducer;
