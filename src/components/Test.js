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
  {/* check the user contect to see if a user is logged in, if not, display the login page info, otherwise display the stock pages */}
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