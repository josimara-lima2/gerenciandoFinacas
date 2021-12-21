import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
