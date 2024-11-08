import { createSlice } from "@reduxjs/toolkit";
import { getAllcountry, getcountryByCode } from "./service";
const CountrySlice = createSlice({
  initialState: {
    loading: false,
    error: null,
    allCountryData: null,
    singleCountryData: null,
  },
  name: "country",
  extraReducers: (builders) => {
    builders
      .addCase(getAllcountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllcountry.fulfilled, (state, action) => {
        state.loading = false;
        state.allCountryData = action.payload;
      })
      .addCase(getAllcountry.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch country list";
      })
      .addCase(getcountryByCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(getcountryByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCountryData = action.payload;
      })
      .addCase(getcountryByCode.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch country Details";
      });
  },
});
// supportTicket
export default CountrySlice.reducer;
