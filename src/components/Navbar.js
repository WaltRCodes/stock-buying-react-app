import React from 'react';
import {Link} from "react-router-dom";
function Navbar() {
  return (
    <div>
        <Link to="/Portfolio">Portfolio</Link>
        <Link to="/Transactions">Transactions</Link>
    </div>
  );
}

export default Navbar;