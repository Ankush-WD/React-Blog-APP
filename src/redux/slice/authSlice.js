import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (values, thunkAPI) => {
    const { email, password } = values;
    const login_url = process.env.REACT_APP_API_URL + "/v1/user/login";
    
    try {
      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: { email, password },
      };
      const data = await axios.get(login_url, config);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {

    console.log(JSON.stringify(formData));
    const register_url = process.env.REACT_APP_API_URL + "/v1/user/register";

    try {
      const headers = {
          'content-type': 'application/json'
      };
      
      const data = await axios.post(register_url, formData,headers);
      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    token: null,
    message: null,
    status:null
  },
  reducers: {
    clearStateValue: (state, action) => {
      state.message = null;
      state.status = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [logIn.fulfilled]: (state, { payload }) => {
      state.user = { ...payload.data };
      state.token = payload.data.token;
      state.isLoggedIn = true;
      state.status = "sucess";
    },
    [logIn.pending]: (state) => {
      state.status = "pending";
    },
    [logIn.rejected]: (state, { payload }) => {
      state.message  = payload.message
      state.status = "fail";
    },
    [register.fulfilled]: (state, { payload }) => {
      state.message  = payload.message
      state.status = "success";
    },
    [register.pending]: (state) => {
      state.status = "pending";
    },
    [register.rejected]: (state, { payload }) => {
      state.message  = payload.message
      state.status = "fail";
    },
  },
});

export default slice.reducer;
export const { clearStateValue } = slice.actions;
