import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import calendarApi from '../../Hooks/calendarApi';


export const fetchTasksByGoal = createAsyncThunk(
  'tasks/fetchByGoal',
  async (goalId) => {
    const res = await calendarApi.get(`/goals/${goalId}/tasks`);
    return res.data;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], status: 'idle' },
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByGoal.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  }
});

export default tasksSlice.reducer;