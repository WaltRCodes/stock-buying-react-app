import React, { useContext } from "react";
import './Styles/App.css';
import UserProvider from "./providers/UserProvider";
import Test from './components/Test';
const App =()=> {
  return (
    <div>
      <UserProvider>
        <Test />
      </UserProvider>
      <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
    </div>
  );
}

export default App;
