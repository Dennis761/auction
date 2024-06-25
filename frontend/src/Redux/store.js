import { configureStore } from '@reduxjs/toolkit';
import AuctionSessionReducer from './Reducers/AuctionSessionReducer.js';
import membersListReducer from './Reducers/MembersListReducer.js'
import userInfoReducer from './Reducers/UserReducer.js'
// import UserReducer from './Reducers/UserReducer.js';

const store = configureStore({
  reducer: {
    auctionSession: AuctionSessionReducer,
    membersList: membersListReducer,
    userInfo: userInfoReducer,
    // users: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
