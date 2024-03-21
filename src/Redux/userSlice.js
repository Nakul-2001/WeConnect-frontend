import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState:{
    currentUser:null,
    isFetching:false,
    error:true,
  },
  reducers: {
    loginStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    loginSuccess: (state,action) => {
        state.currentUser = action.payload;
        state.error = false;
        state.isFetching = false;
    },
    loginFailure: (state) => {
        state.currentUser = null;
        state.error = true;
        state.isFetching = false;
    },
    logout:(state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = true;
  }
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions

export default userSlice.reducer