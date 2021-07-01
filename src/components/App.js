import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import "../css/reset.css";
import "../css/styles.css";

import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Home from "./home/Home";
import Cart from "./cart/Cart";

import GlobalStyle from "./styles/globalStyles"

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/sign-up" exact component={SignUp}></Route>
          <Route path="/" exact component={Home}></Route>
          <Route path="/cart" exact component={Cart}></Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
