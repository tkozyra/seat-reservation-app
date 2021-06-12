import { configureStore } from "@reduxjs/toolkit";
import numberOfSeatsReducer from "../app/numberOfSeatsSlice";
import selectedSeatsReducer from "../app/selectedSeatsSlice";

export const store = configureStore({
  reducer: {
    numberOfSeats: numberOfSeatsReducer,
    selectedSeats: selectedSeatsReducer,
  },
});
