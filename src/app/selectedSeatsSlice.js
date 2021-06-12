import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
};

export const selectedSeatsSlice = createSlice({
  name: "selectedSeats",
  initialState,
  reducers: {
    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload.selectedSeats;
    },
  },
});

export const { setSelectedSeats } = selectedSeatsSlice.actions;

export const selectSelectedSeats = (state) => state.selectedSeats.selectedSeats;

export default selectedSeatsSlice.reducer;
