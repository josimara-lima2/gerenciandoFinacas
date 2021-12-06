// Exemplo reducer de posts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiEXAMPLE } from 'services/api';
import { RootState } from 'store/rootReducer';

export declare interface PostsInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type PostsState = {
  posts: PostsInterface[];
  loadingPosts: boolean;
};

// Async Thunks
export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async () => {
    const response = await apiEXAMPLE.get('posts');
    return response.data as PostsInterface[];
  },
);

const initialState: PostsState = {
  posts: [],
  loadingPosts: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllPosts.pending, state => {
      state.loadingPosts = true;
    });
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.loadingPosts = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchAllPosts.rejected, state => {
      state.loadingPosts = false;
    });
  },
});

export const postsSelector = (state: RootState) => state.posts;
export default postsSlice.reducer;
