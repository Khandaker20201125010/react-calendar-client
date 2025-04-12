import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import goalsReducer from './goalsSlice';
import tasksReducer from './tasksSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    events: eventsReducer,
    goals: goalsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});