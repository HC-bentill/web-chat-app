import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    appState: null,
  },
  reducers: {
    setappState: (state, action) => {
      state.appState = action.payload; 
    },
  },
});

export const { setappState } = appSlice.actions;

export const selectappState= (state) => state.app.appState; //so from state(onion) to the appslice to registrationForm

export default appSlice.reducer;