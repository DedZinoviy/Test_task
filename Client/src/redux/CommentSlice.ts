import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types';

interface CommentsState {
  data: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  data: [],
  loading: false,
  error: null,
};

/** Слайс состояния комментариев. */
const CommentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setComments, setLoading, setError } = CommentsSlice.actions;
export default CommentsSlice.reducer;
