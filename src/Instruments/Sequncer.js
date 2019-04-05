import React, { Component } from "react";
// import Bpm from "../Components/Bpm";

import "../App.css";
import MIDISounds from "midi-sounds-react";

class Sequncer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drumSnare: 15,
      drumBass: 5,
      drumHiHat: 35,
      drumClap: 24,
      tracks: [
        [
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          true,
          false,
          true,
          false,
          false,
          false,
          true,
          false
        ],
        [
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false
        ],
        [
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        [
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false,
          true,
          false
        ]
      ],
      bpm: 120
    };
    this.state.data = [];
    this.beats = [];
  }
  componentDidMount() {
    this.setState({ initialized: true });
  }
  onSelectDrumSnare = e => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    this.midiSounds.cacheDrum(n);
    var me = this;
    this.midiSounds.player.loader.waitLoad(function() {
      me.setState({
        drumSnare: n
      });
      me.fillBeat();
    });
  };
  onSelectDrumBass = e => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    this.midiSounds.cacheDrum(n);
    var me = this;
    this.midiSounds.player.loader.waitLoad(function() {
      me.setState({
        drumBass: n
      });
      me.fillBeat();
    });
  };
  onSelectDrumHiHat = e => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    this.midiSounds.cacheDrum(n);
    var me = this;
    this.midiSounds.player.loader.waitLoad(function() {
      me.setState({
        drumHiHat: n
      });
      me.fillBeat();
    });
  };
  onSelectDrumClap = e => {
    var list = e.target;
    var n = list.options[list.selectedIndex].getAttribute("value");
    this.midiSounds.cacheDrum(n);
    var me = this;
    this.midiSounds.player.loader.waitLoad(function() {
      me.setState({
        drumClap: n
      });
      me.fillBeat();
    });
  };
  createSelectItems() {
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
  }
  fillBeat() {
    for (var i = 0; i < 16; i++) {
      var drums = [];
      if (this.state.tracks[0][i]) {
        drums.push(this.state.drumBass);
      }
      if (this.state.tracks[1][i]) {
        drums.push(this.state.drumSnare);
      }
      if (this.state.tracks[2][i]) {
        drums.push(this.state.drumClap);
      }
      if (this.state.tracks[3][i]) {
        drums.push(this.state.drumHiHat);
      }
      var beat = [drums, []];
      this.beats[i] = beat;
    }
  }
  playLoop = () => {
    this.fillBeat();
    this.midiSounds.startPlayLoop(this.beats, this.state.bpm, 1 / 16);
  };
  stopLoop = () => {
    this.midiSounds.stopPlayLoop();
  };
  toggleDrum(track, step) {
    var a = this.state.tracks;
    a[track][step] = !a[track][step];
    this.setState({ tracks: a });
    this.fillBeat();
  }

  BpmHandler = e => {
    console.log(e.target.value);
    this.setState({
      bpm: e.target.value
    });
  };

  render() {
    return (
      <div className="Sequncer">
        <header className="Sequncer-header">
          <h1 className="Sequncer-title">DRUM SEQUNCER</h1>
        </header>

        <table align="center">
          <tbody>
            <tr>
              <td>
                <select
                  value={this.state.drumBass}
                  onChange={this.onSelectDrumBass}
                >
                  {this.createSelectItems()}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][0]}
                  onChange={e => this.toggleDrum(0, 0)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][1]}
                  onChange={e => this.toggleDrum(0, 1)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][2]}
                  onChange={e => this.toggleDrum(0, 2)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][3]}
                  onChange={e => this.toggleDrum(0, 3)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][4]}
                  onChange={e => this.toggleDrum(0, 4)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][5]}
                  onChange={e => this.toggleDrum(0, 5)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][6]}
                  onChange={e => this.toggleDrum(0, 6)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][7]}
                  onChange={e => this.toggleDrum(0, 7)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][8]}
                  onChange={e => this.toggleDrum(0, 8)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][9]}
                  onChange={e => this.toggleDrum(0, 9)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][10]}
                  onChange={e => this.toggleDrum(0, 10)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][11]}
                  onChange={e => this.toggleDrum(0, 11)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][12]}
                  onChange={e => this.toggleDrum(0, 12)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][13]}
                  onChange={e => this.toggleDrum(0, 13)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][14]}
                  onChange={e => this.toggleDrum(0, 14)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[0][15]}
                  onChange={e => this.toggleDrum(0, 15)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={this.state.drumSnare}
                  onChange={this.onSelectDrumSnare}
                >
                  {this.createSelectItems()}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][0]}
                  onChange={e => this.toggleDrum(1, 0)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][1]}
                  onChange={e => this.toggleDrum(1, 1)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][2]}
                  onChange={e => this.toggleDrum(1, 2)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][3]}
                  onChange={e => this.toggleDrum(1, 3)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][4]}
                  onChange={e => this.toggleDrum(1, 4)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][5]}
                  onChange={e => this.toggleDrum(1, 5)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][6]}
                  onChange={e => this.toggleDrum(1, 6)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][7]}
                  onChange={e => this.toggleDrum(1, 7)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][8]}
                  onChange={e => this.toggleDrum(1, 8)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][9]}
                  onChange={e => this.toggleDrum(1, 9)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][10]}
                  onChange={e => this.toggleDrum(1, 10)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][11]}
                  onChange={e => this.toggleDrum(1, 11)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][12]}
                  onChange={e => this.toggleDrum(1, 12)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][13]}
                  onChange={e => this.toggleDrum(1, 13)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][14]}
                  onChange={e => this.toggleDrum(1, 14)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[1][15]}
                  onChange={e => this.toggleDrum(1, 15)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={this.state.drumClap}
                  onChange={this.onSelectDrumClap}
                >
                  {this.createSelectItems()}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][0]}
                  onChange={e => this.toggleDrum(2, 0)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][1]}
                  onChange={e => this.toggleDrum(2, 1)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][2]}
                  onChange={e => this.toggleDrum(2, 2)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][3]}
                  onChange={e => this.toggleDrum(2, 3)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][4]}
                  onChange={e => this.toggleDrum(2, 4)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][5]}
                  onChange={e => this.toggleDrum(2, 5)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][6]}
                  onChange={e => this.toggleDrum(2, 6)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][7]}
                  onChange={e => this.toggleDrum(2, 7)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][8]}
                  onChange={e => this.toggleDrum(2, 8)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][9]}
                  onChange={e => this.toggleDrum(2, 9)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][10]}
                  onChange={e => this.toggleDrum(2, 10)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][11]}
                  onChange={e => this.toggleDrum(2, 11)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][12]}
                  onChange={e => this.toggleDrum(2, 12)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][13]}
                  onChange={e => this.toggleDrum(2, 13)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][14]}
                  onChange={e => this.toggleDrum(2, 14)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[2][15]}
                  onChange={e => this.toggleDrum(2, 15)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={this.state.drumHiHat}
                  onChange={this.onSelectDrumHiHat}
                >
                  {this.createSelectItems()}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][0]}
                  onChange={e => this.toggleDrum(3, 0)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][1]}
                  onChange={e => this.toggleDrum(3, 1)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][2]}
                  onChange={e => this.toggleDrum(3, 2)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][3]}
                  onChange={e => this.toggleDrum(3, 3)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][4]}
                  onChange={e => this.toggleDrum(3, 4)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][5]}
                  onChange={e => this.toggleDrum(3, 5)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][6]}
                  onChange={e => this.toggleDrum(3, 6)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][7]}
                  onChange={e => this.toggleDrum(3, 7)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][8]}
                  onChange={e => this.toggleDrum(3, 8)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][9]}
                  onChange={e => this.toggleDrum(3, 9)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][10]}
                  onChange={e => this.toggleDrum(3, 10)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][11]}
                  onChange={e => this.toggleDrum(3, 11)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][12]}
                  onChange={e => this.toggleDrum(3, 12)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][13]}
                  onChange={e => this.toggleDrum(3, 13)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][14]}
                  onChange={e => this.toggleDrum(3, 14)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={this.state.tracks[3][15]}
                  onChange={e => this.toggleDrum(3, 15)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          BPM:
          <input
            onChange={this.BpmHandler}
            className="Bpm"
            type="number"
            name="Bpm"
            value={this.state.bpm}
          />
        </div>
        <div className="div-button">
          <button onClick={this.playLoop}>Play loop</button>
          <button onClick={this.stopLoop}>Stop loop</button>
        </div>

        <div className="midi-sounds">
          <MIDISounds
            className="midi-sounds"
            ref={ref => (this.midiSounds = ref)}
            appElementName="root"
            drums={[
              this.state.drumSnare,
              this.state.drumBass,
              this.state.drumHiHat,
              this.state.drumClap
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Sequncer;
