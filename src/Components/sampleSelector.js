import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class SampleSelector extends React.Component {
  state = {
    open: false
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  //need to use state

  render() {
    const { classes } = this.props;

    return (
      <select
        className="selector"
        autoFocus
        value={this.props.selectedDrum}
        onChange={this.props.onSelectDrum}
        onBlur={this.close}
      >
        {this.props.createdDrums}
      </select>
    );
  }
}
SampleSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SampleSelector);
