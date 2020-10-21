import React, { useState, useContext, useEffect } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./pages/privateRoute";

// pages
import Landing from "./pages/landing/landing";
import Main from "./pages/main/main";
import Profile from "./pages/profile/profile";
import Collection from "./pages/collection/collection";
import AddLiterature from "./pages/literature/addLiterature";
import Detail from "./component/detail/detail";

import Verify from "./pages/mainAdm/mainAdm";

import { API, setAuthToken } from "./config/api";
import { Context } from "./context/context";

// if token avaliable in local storage then set default header for auth
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(Context);

  // use effect will be executed after all runs
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR"
        });
      }
    };

    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/main" exact component={Main} />
        <PrivateRoute path="/profile" exact component={Profile} />
        <PrivateRoute path="/collection" exact component={Collection} />
        <PrivateRoute path="/addLiterature" exact component={AddLiterature} />
        <PrivateRoute path="/detail/:id" exact component={Detail} />

        <Route path="/mainAdm" exact component={Verify} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
