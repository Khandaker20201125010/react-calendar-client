import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create Event thunk: returns event with real Date objects
export const createEvent = createAsyncThunk(
  'events/create',
  async (event) => {
    // simulate API delay...
    await new Promise(r => setTimeout(r, 200));
    return {
      ...event,
      _id: Date.now().toString(),
      start: new Date(event.start),
      end:   new Date(event.end),
    };
  }
);

// Update Event thunk: ensures Dates too
export const updateEvent = createAsyncThunk(
  'events/update',
  async (event) => {
    await new Promise(r => setTimeout(r, 200));
    return {
      ...event,
      start: new Date(event.start),
      end:   new Date(event.end),
    };
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: { items: [] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.items.findIndex(e => e._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export default eventsSlice.reducer;
