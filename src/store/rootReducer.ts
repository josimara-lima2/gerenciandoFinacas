import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import userReducer from './reducers/user';
import clientsReducer from './reducers/clients';
import cardReducer from './reducers/cards';
import pageReducer from './reducers/pages';
import pagesCardReducer from './reducers/pageCard';

const rootReducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  clients: clientsReducer,
  cards: cardReducer,
  pages: pageReducer,
  pagesCard: pagesCardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
