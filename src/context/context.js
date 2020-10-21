import React, { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  // || localStorage.getItem("isLogin"),
  isLogin: false || localStorage.getItem("isLogin"),
  user: null,
  loading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        loading: false
      };

    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: false,
        user: null,
        loading: false
      };

    case "LOGIN_SUCCSES":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        loading: false
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        loading: false,
        user: null
      };

    case "LOGIN_ADM":
      localStorage.setItem("isLogin", true);
      return {
        ...state,
        isLogin: true
      };

    case "LOGOUT_ADM":
      localStorage.removeItem("isLogin");
      return {
        ...state,
        isLogin: false
      };

    default:
      throw new Error();
  }
};

export const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
