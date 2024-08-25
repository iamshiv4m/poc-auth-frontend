import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GoogleSignIn from "./components/GoogleButton";
import AudioInputLevel from "./components/AudioMetre";
import GridLayout from "./components/GridLayout";
import items from "./constant";

function App() {
  return (
    <div className="">
      {/*  <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
      {/* <AudioInputLevel /> */}
      <GoogleSignIn />
      {/* <GridLayout items={items} /> */}
    </div>
  );
}

export default App;
