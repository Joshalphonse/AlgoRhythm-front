import React from "react";
import { Button } from "semantic-ui-react";
//control buttons
export default function Controls(props) {
  //alternate between text displaying Pause and Play
  let buttonText = props.playing ? "Pause" : "Play";
  return (
    <div className="controls">
      <Button className="control_buttons" onClick={() => props.togglePlaying()}>
        {buttonText}
      </Button>
      <div className="bpm">
        <label>BPM:</label>
        <input
          type="range"
          id="bpm"
          min="1"
          max="210"
          step="1"
          defaultValue={props.bpm}
          onChange={props.handleChange}
        />
        <output>{props.bpm}</output>
      </div>
      <button className="control_buttons" onClick={() => props.addNewPads()}>
        Add Row
      </button>
    </div>
  );
}
