import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from './CommentSlice';

// Конфигурация хранилища
export const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

// Типы для использования в проекте

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store