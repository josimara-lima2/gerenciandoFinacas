import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import pageReducer from './reducers/pageClient';
import pagesCardReducer from './reducers/pageCard';
import purchasesReducer from './reducers/compras';
import userLogadoReducer from './reducers/userLogado';

const rootReducer = combineReducers({
  user: userReducer,
  pages: pageReducer,
  pagesCard: pagesCardReducer,
  purchases: purchasesReducer,
  logado: userLogadoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
