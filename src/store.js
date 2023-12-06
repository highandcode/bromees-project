import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/auth';
import messagesReducer from './reducers/message';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer
  }
});
