import React, { Component } from "react";

import Sequncer from "./Instruments/Sequncer";
import Keyboard from "./Instruments/Keyboard";
import Logo from "./Components/Logo";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Logo />
        <Sequncer />
        <Keyboard />
      </div>
    );
  }
}

export default App;
