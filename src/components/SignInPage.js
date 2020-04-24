import React, {useState} from "react";
import {Link} from "react-router-dom";
import { auth } from "../firebase";


const SignInPage = () => {
    {/* create state hooks for the email password and error */}
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    {/* check to see if the email and password are correct */}
    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      {/* set the email and password into state */}
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };
   {/* a form to handle the data */}

  return (
    <div className="main">
      <h1>Sign In</h1>
      <div >
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="userEmail">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            value = {email}
            placeholder="test@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
        </form>
         <Link to="/SignUp">Don't have an account? Sign up here
          </Link>
          <br />
          <Link to="/PasswordReset">
            Forgot Password?
          </Link>
      </div>
    </div>
  );
};

export default SignInPage;