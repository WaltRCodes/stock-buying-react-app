import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { UserContext } from "../providers/UserProvider";
import {Link} from "react-router-dom";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
{/* utilize state hooks to hold onto an email state, boolean for the email check, and an error */}
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
{/* This sets an email */}
    if (name === "userEmail") {
      setEmail(value);
    }
  };
{/* utilizes firebase to send a reset email */}
  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
          setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  {/* utilize state in order to decide which messages to display */}
  return (
    <div className="main">
      <h1>
        Reset your Password
      </h1>
      <div>
        <form action="">
          {emailHasBeenSent && (
            <div>
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div>
              {error}
            </div>
          )}
          <label htmlFor="userEmail">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
          />
          <button onClick={event => {sendResetEmail(event);}}>
            Send me a reset link
          </button>
        </form>
        <Link to="/">back to sign in page</Link>
      </div>
    </div>
  );
};

export default PasswordResetPage;