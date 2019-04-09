import React from "react";
import { addUser } from "../actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    bio: "",
    avatar: ""
  };

  //
  handleChange = e => {
    this.setState({
      [e.target.placeholder]: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.addUser(this.state)) {
      this.props.history.push("/home");
    }
  };
  render() {
    return (
      <div className="signup-page">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
            name="username"
          />
          <input
            type="text"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
            name="password"
          />
          <input
            type="text"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            placeholder="password_confirmation"
            name="password_confirmation"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addUser }
)(withRouter(Signup));
