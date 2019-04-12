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
        <div className="shiv">
          <Keyboard />
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  null
)(withRouter(InstrumentContainer));
