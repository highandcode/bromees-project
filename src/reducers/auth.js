import { createSlice } from '@reduxjs/toolkit';
// import { act } from "react-dom/test-utils";
// import {
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT,
//   } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
//   export default function (state = initialState, action) {
//     const { type, payload } = action;
  
//     switch (type) {
//       case REGISTER_SUCCESS:
//         return {
//           ...state,
//           isLoggedIn: false,
//         };
//       case REGISTER_FAIL:
//         return {
//           ...state,
//           isLoggedIn: false,
//         };
//       case LOGIN_SUCCESS:
//         return {
//           ...state,
//           isLoggedIn: true,
//           user: payload.user,
//         };
//       case LOGIN_FAIL:
//         return {
//           ...state,
//           isLoggedIn: false,
//           user: null,
//         };
//       case LOGOUT:
//         return {
//           ...state,
//           isLoggedIn: false,
//           user: null,
//         };
//       default:
//         return state;
//     }
//   }


const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    registerSuccess(state = initialState, action) {
          state.isLoggedIn = false;
    },
    registerFail( state = initialState, action ){
        state.isLoggedIn = false;
    },
    loginSuccess( state = initialState, action) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
    },
    loginFail( state = initialState, action) {
        state.isLoggedIn = false;
        state.user = null;
    },
    logOut( state = initialState, action) {
        state.isLoggedIn = false;
        state.user = null;
    },
  }
})

export const { registerSuccess, registerFail, loginSuccess, loginFail, logOut } = userSlice.actions;
export default userSlice.reducer;