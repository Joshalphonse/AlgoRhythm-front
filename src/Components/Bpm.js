import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class BPMTapButton extends React.Component {
  state = {
    count: 0,
    timeFirst: 0,
    timePrevious: 0,
    bpm: 0
  };

  //mouse down gives a more accurate timing
  handleMouseDown = () => {
    const { count, timeFirst, timePrevious } = this.state;
    const timeSeconds = new Date();
    const time = timeSeconds.getTime();

    //if its been 3 seconds since last click reset the counter & previous time
    if (timePrevious !== 0 && time - timePrevious > 3000) {
      this.setState({
        count: 0,
        timePrevious: time
      });
      return false;
    }
    //if first click set the initial time and count
    if (count === 0) {
      this.setState({
        timeFirst: time,
        count: count + 1
      });
    } else {
      const bpmAvg = (60000 * count) / (time - timeFirst);
      let bpm = Math.round(bpmAvg * 100) / 100;
      this.setState({
        bpm,
        count: count + 1,
        timePrevious: time
      });
    }
  };

  render() {
    return (
      <div className="idunno">
        <h1 className="btn">BPM: {this.state.bpm}</h1>

        <Button
          basic
          color="purple"
          content="Purple"
          className="btn"
          onMouseDown={this.handleMouseDown}
        >
          CLICK4BPM: {this.state.bpm}
        </Button>
      </div>
    );
  }
}

export default BPMTapButton;
