import React, { Component } from "react";
import Sequncer from "../Instruments/Sequncer";
import Keyboard from "../Instruments/Keyboard";

class InstrumentContainer extends Component {
  render() {
    return (
      <div>
        <Sequncer />
        <Keyboard />
      </div>
    );
  }
}
export default InstrumentContainer;
