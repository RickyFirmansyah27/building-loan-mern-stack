import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    gedung: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}


export const getGedungById = createAsyncThunk(
    'gedungs/getById', 
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`http://localhost:5000/gedungs/${id}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          const message = error.response.data.msg;
          return thunkAPI.rejectWithValue(message);
        }
        throw error; 
      }
    }
  );


export const gedungSlice = createSlice({
    name: "gedung",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(getGedungById.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getGedungById.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getGedungById.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

    }
});

export const {reset} = gedungSlice.actions;
export default gedungSlice.reducer;