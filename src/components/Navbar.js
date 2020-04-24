import React from 'react';
import {Link} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../firebase";

const Navbar = () => {
    const user = useContext(UserContext);
    const {displayName} = user;
  return (
    <div className="nav-bar">
        <p>Welcome {displayName}!</p>
        <Link to="/Portfolio">Portfolio</Link>
        <Link to="/Transactions">Transactions</Link>
        <button onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
  );
}

export default Navbar;