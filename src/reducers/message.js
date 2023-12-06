// import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

// const initialState = {};

// export default function (state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_MESSAGE:
//       return { message: payload };

//     case CLEAR_MESSAGE:
//       return { message: "" };

//     default:
//       return state;
//   }
// }

import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
    setMessage(state, action){
        state.message = action.payload;
    },
    clearMessage(state, action){
        state.message = "";
    }

  }
})

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;