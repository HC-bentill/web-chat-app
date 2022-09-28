import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    appState: null,
    messages:[]
  },
  reducers: {
    setappState: (state, action) => {
      state.appState = action.payload; 
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },  },
});

export const { setappState, addMessage } = appSlice.actions;

export const selectappState= (state) => state.app.appState; 

export const selectMessages= (state) => state.app.messages;


export default appSlice.reducer;