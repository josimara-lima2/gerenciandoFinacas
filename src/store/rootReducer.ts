import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import userReducer from './reducers/user';
import clientsReducer from './reducers/clients';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  clients: clientsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
