import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllcountry = createAsyncThunk(
    "getAllcountry",
    async () => {
      try {
        const res = await axios.get("http://localhost:4000/countries");
        const response = res.data;
  
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );


  export const getcountryByCode = createAsyncThunk(
    "getcountryCode",
    async (data) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/countriescode/${data}`);
        const response = res.data;
  
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  );