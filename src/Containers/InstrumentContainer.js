import React, { Component } from "react";
import Sequncer from "../Instruments/Sequncer";
import Keyboard from "../Instruments/Keyboard";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Animated } from "react-animated-css";
import BPMTapButton from "../Components/Bpm";

class InstrumentContainer extends Component {
  render() {
    return (
      <Animated
        animationIn="slideInLeft"
        animationOut="zoomOutDown"
        animationInDuration={2000}
        animationOutDuration={2000}
        isVisible={true}
      >
        <div>
          <Sequncer />
          <div className="shiv">
            <div>
              <BPMTapButton />
            </div>
            <Keyboard />
          </div>
        </div>
      </Animated>
    );
  }
}
export default connect(
  null,
  null
)(withRouter(InstrumentContainer));
