import {
  FETCH_SESSIONS_START,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  FETCH_SESSION_DETAILS_START,
  FETCH_SESSION_DETAILS_SUCCESS,
  FETCH_SESSION_DETAILS_FAILURE,
  UPDATE_PARTICIPANTS
} from '../Constants/MembersListConstants';

const initialState = {
  sessions: [],
  selectedSession: null,
  participants: [],
  loading: false,
  error: null
};

const membersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS_START:
    case FETCH_SESSION_DETAILS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: action.payload
      };
    case FETCH_SESSION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedSession: action.payload,
        participants: action.payload.participants
      };
    case FETCH_SESSIONS_FAILURE:
    case FETCH_SESSION_DETAILS_FAILURE:
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
    default:
      return state;
  }
};

export default membersListReducer;
