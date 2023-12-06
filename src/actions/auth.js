import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

  import { loginFail, loginSuccess, registerFail, logOut, registerSuccess   } from '../reducers/auth';
  import { setMessage } from '../reducers/message';
  
  import AuthService from "../services/auth.service";
  
  export const register = (username, email, password, firstName, lastName) => (dispatch) => {
    return AuthService.register(username, email, password, firstName, lastName).then(
      (response) => {
        dispatch(registerSuccess());
  
        dispatch(setMessage(response.data.message));
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(registerFail({}));
  
        dispatch(setMessage(message));
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (user) => {
        dispatch(loginSuccess( {user} ));
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch(loginFail());
  
        dispatch(setMessage(message));
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch(logOut());
  };