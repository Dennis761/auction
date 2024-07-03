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

const initialState = {
  createdSession: [],
  loading: false,
  error: null,
  participants: [],
  remainingTime: null,
  auctionEnded: false
};

const organizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AUCTION_REQUEST:
    case DELETE_AUCTION_REQUEST:
    case START_AUCTION_TIMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        createdSession: action.payload.createdSession,
        auctionProduct: action.payload.auctionProduct
      };
    case DELETE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case START_AUCTION_TIMER_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_AUCTION_FAILURE:
    case DELETE_AUCTION_FAILURE:
    case START_AUCTION_TIMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload
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

export default organizerReducer;
