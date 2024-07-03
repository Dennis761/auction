import { configureStore } from '@reduxjs/toolkit';
import auctionSessionReducer from './Reducers/AuctionSessionReducer.js';
import {loginReducer, createNewUserReducer } from './Reducers/LoginReducer.js'
import organizerReducer from './Reducers/OrganizerReducer.js';
import userReducer from './Reducers/UserReducer.js'

const store = configureStore({
  reducer: {
    auctionSession: auctionSessionReducer,
    user: userReducer,
    login: loginReducer,
    createNewUser: createNewUserReducer,
    organizer: organizerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
