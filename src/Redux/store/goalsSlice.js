import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import calendarApi from '../../Hooks/calendarApi';


export const fetchGoals = createAsyncThunk('goals/fetch', async () => {
  const res = await calendarApi.get('/goals');
  return res.data;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: { items: [], status: 'idle' },
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  }
});

export default goalsSlice.reducer;