import React, { Component } from "react";
import Pads from "../Components/Pads";
import Controls from "../Components/controls";
// import Bpm from "../Components/Bpm";

import "../App.css";
import MIDISounds from "midi-sounds-react";

class Sequncer extends Component {
  state = {
    drumSnare: 15,
    drumBass: 5,
    drumHiHat: 35,
    drumClap: 24,
    pads: [
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    ],
    bpm: 108,
    start: 1 / 16,
    numPads: 4,
    playing: false,
    position: 0,
    selectedDrum: [5, 46, 145, 35],
    volume: [0.5, 0.5, 0.5, 0.5],
    mute: false,
    open1: false,
    open2: false,
    userPads: [],
    loaded: true
  };

  componentDidMount() {
    this.setState({ initialized: true });
  }

  toggleActive = (rowIndex, id) => {
    //log Pad row and column position
    // console.log('Pad', rowIndex, id);
    let pads = [...this.state.pads];
    let padActive = pads[rowIndex][id];

    if (padActive === 1) {
      pads[rowIndex][id] = 0;
    } else {
      pads[rowIndex][id] = 1;
    }

    this.setState({ pads: pads });
  };

  togglePlaying = () => {
    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setState({ playing: false });
    } else {
      this.setTimer();
      this.setState({ playing: true });
    }
  };
  //tick the position forward and play a sound
  setTimer = () => {
    this.timerId = setInterval(
      () => this.tick(),
      this.calculateTempo(this.state.bpm)
    );
  };

  calculateTempo = bpm => {
    return 15000 / bpm;
  };
  //increment the pad position by one and play the given instrument
  //by calling checkpad()
  tick() {
    let pos = this.state.position;
    pos++;
    if (pos > 15) {
      pos = 0;
    }
    this.setState({ position: pos });
    this.checkPad();
  }

  checkPad = () => {
    this.state.pads.forEach((row, rowIndex) => {
      row.forEach((pad, index) => {
        if (index === this.state.position && pad === 1) {
          // console.log("active");
          this.playSound(rowIndex);
        }
      });
    });
  };

  playSound = rowIndex => {
    // console.log("play");
    let sample = this.state.selectedDrum[rowIndex];
    this.midiSounds.playDrumsNow([sample]);
  };

  changeBpm = bpm => {
    this.setState({ bpm: bpm.target.value });
    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setTimer();
    }
  };

  changeSampleVolume = (e, rowIndex) => {
    // console.log("event: ", e, "row: ", rowIndex);
    let rackVol = [...this.state.volume];

    rackVol.splice(rowIndex, 1, e.target.value);
    let sampleVol = rackVol[rowIndex];
    this.setState({ volume: rackVol });

    // console.log("rackVol: ", rackVol);
    // console.log("sampleVol: ", sampleVol);
    this.sendVolumes(rowIndex, sampleVol);

    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setTimer();
    }
  };

  sendVolumes = (rowIndex, volume) => {
    // console.log("In change volume state. The selected Drums: ", this.state.selectedDrum[rowIndex], "The Volume: ", this.state.volume[rowIndex])
    this.midiSounds.setDrumVolume(this.state.selectedDrum[rowIndex], volume);
  };

  onSelectDrum = (e, rowIndex) => {
    let list = e.target;
    console.log(e.target);
    let n = list.options[list.selectedIndex].getAttribute("value");
    let drumSelect = [...this.state.selectedDrum];
    //row drum only for console.log
    let rowDrum = drumSelect[rowIndex];

    drumSelect.splice(rowIndex, 1, n);
    console.log("ROW Drum: ", rowDrum, "Index: ", rowIndex);

    this.setState({ selectedDrum: drumSelect });

    console.log("Selected Drums: ", drumSelect);
    this.midiSounds.cacheDrum(n);
  };
  //figure out how this works
  //array of options
  createSelectItems = () => {
    if (this.midiSounds) {
      if (!this.items) {
        this.items = [];
        for (
          let i = 0;
          i < this.midiSounds.player.loader.drumKeys().length;
          i++
        ) {
          this.items.push(
            <option key={i} value={i}>
              {"" +
                (i + 0) +
                ". " +
                this.midiSounds.player.loader.drumInfo(i).title}
            </option>
          );
        }
      }
      return this.items;
    }
  };

  addNewPads = () => {
    let newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // console.log("state", this.state);
    let newVol = 0.5;
    //set newDrum to default of 21(handClap)
    let newDrum = Math.floor(Math.random() * 234) + 1;
    this.setState({ pads: [...this.state.pads, newArray] });
    this.state.volume.push(newVol);
    this.state.selectedDrum.push(newDrum);
    // this.state.numPads++;
    this.setState({
      numPads: this.state.numPads + 1
    });
    // console.log(this.state.numPads);
  };
  // iterate through individual pads in rows and change
  // on values(1) to off(0)
  clearRow = rowIndex => {
    // console.log('Pad row:', rowIndex);
    let pads = [...this.state.pads];
    let padState = pads[rowIndex];
    // console.log("padState: ", padState);
    for (let i = 0; i < padState.length; i++) {
      if (padState[i] === 1) {
        pads[rowIndex][i] = 0;
      }
    }
    // console.log("pushed pads: ", pads);
    this.setState({ pads: pads });
  };

  deleteRow = rowIndex => {
    let pads = [...this.state.pads];
    let volume = [...this.state.volume];
    let drums = [...this.state.selectedDrum];

    pads.splice(rowIndex, 1);
    volume.splice(rowIndex, 1);
    drums.splice(rowIndex, 1);
    // console.log("pushed pads: ", pads);
    this.setState({ pads: pads });
    this.setState({ volume: volume });
    this.setState({ selectedDrum: drums });
    // this.state.numPads--;
    this.setState({
      numPads: this.state.numPads - 1
    });
    // console.log(this.state.numPads);
  };

  clickPadButtons = (loadPads, loadDrums) => {
    let newPads = loadPads;
    let newDrums = loadDrums;
    this.setState({ pads: newPads });
    this.setState({ selectedDrum: newDrums });
  };

  render() {
    return (
      <div className="main">
        {/* {width <= 600 ? alert('If you are using HyperLoop on a mobile device, please use landscape orientation for the best possible experience') : null} */}
        <div className="App">
          <h1 className="sequencer-title">AlgoRhythm Sequencer</h1>
          <Pads
            pos={this.state.position}
            pads={this.state.pads}
            toggleActive={this.toggleActive}
            clearRow={this.clearRow}
            deleteRow={this.deleteRow}
            selectedDrum={this.state.selectedDrum}
            createdDrums={this.createSelectItems()}
            onSelectDrum={this.onSelectDrum}
            sampleVolume={this.state.volume}
            changeVolume={this.changeSampleVolume}
          />
          <Controls
            bpm={this.state.bpm}
            handleChange={this.changeBpm}
            playing={this.state.playing}
            togglePlaying={this.togglePlaying}
            addNewPads={this.addNewPads}
          />
          <div className="midi-sounds">
            <MIDISounds
              ref={ref => (this.midiSounds = ref)}
              appElementName="root"
              instruments={[234]}
              drums={[2, 33, 15, 5, 35, 24]}
              // drums={[5, 25, 20, 35]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Sequncer;
