import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numberOfSeats: 0,
  adjacent: false,
};

export const numberOfSeatsSlice = createSlice({
  name: "numberOfSeats",
  initialState,
  reducers: {
    setNumberOfSeats: (state, action) => {
      state.numberOfSeats = Number(action.payload.numberOfSeats);
      state.adjacent = action.payload.adjacent || false;
    },
  },
});

export const { setNumberOfSeats } = numberOfSeatsSlice.actions;

export const selectNumberOfSeats = (state) => state.numberOfSeats.numberOfSeats;
export const selectAdjacent = (state) => state.numberOfSeats.adjacent;

export default numberOfSeatsSlice.reducer;
