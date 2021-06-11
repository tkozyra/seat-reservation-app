import { configureStore } from "@reduxjs/toolkit";
import numberOfSeatsReducer from "../app/numberOfSeatsSlice";

export const store = configureStore({
  reducer: {
    numberOfSeats: numberOfSeatsReducer,
  },
});
