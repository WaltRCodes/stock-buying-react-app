import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import PasswordResetPage from "./PasswordResetPage";
import Information from './Information';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
const Test =()=> {
  const user = useContext(UserContext);
  return (
    user ?
    <Information />
  :
    <BrowserRouter>
      <Route path="/SignUp" component={SignUpPage} />
      <Route path="/PasswordReset" component={PasswordResetPage} />
      <Route exact strict path="/" component={SignInPage} />
    </BrowserRouter>
      
  );
}

export default Test;