import React, { useContext } from "react";
import './App.css';
import UserProvider from "./providers/UserProvider";
import Test from './components/Test';
function App() {
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
