import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import calendarApi from '../../Hooks/calendarApi';


export const fetchEvents = createAsyncThunk('events/fetch', async () => {
  const res = await calendarApi.get('/events');
  return res.data;
});
export const createEvent = createAsyncThunk('events/create', async (event) => {
  const res = await calendarApi.post('/events', event);
  return { ...event, _id: res.data.insertedId };
});
export const updateEvent = createAsyncThunk('events/update', async (event) => {
  await calendarApi.put(`/events/${event._id}`, event);
  return event;
});
export const deleteEvent = createAsyncThunk('events/delete', async (id) => {
  await calendarApi.delete(`/events/${id}`);
  return id;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.items.findIndex(e => e._id === action.payload._id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e._id !== action.payload);
      });
  }
});

export default eventsSlice.reducer;