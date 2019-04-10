import React, { Component } from "react";
import Sequncer from "../Instruments/Sequncer";
import Keyboard from "../Instruments/Keyboard";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
export default connect(
  null,
  null
)(withRouter(InstrumentContainer));
