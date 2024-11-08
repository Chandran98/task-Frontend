import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./reducer";

export const store = configureStore({
    reducer: {
        country: countryReducer,
    },
  });