import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    event: null,
  },
  reducers: {
    openModal: (state, action) => {
      console.log("Modal opened with payload:", action.payload);
      state.isOpen = true;
      state.event = action.payload || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.event = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
