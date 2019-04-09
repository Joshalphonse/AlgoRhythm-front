import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";

import { connect } from "react-redux";
import { checkToken } from "./actions/userActions";
import Home from "./Containers/Home";

import NavBar from "./Containers/NavBar";

import ErrorMessage from "./Components/ErrorMessage";
import Login from "./Components/Login";

import Signup from "./Components/Signup";

import InstrumentContainer from "./Containers/InstrumentContainer";

class App extends React.Component {
  componentDidMount = () => {
    let token = localStorage.token;
    return token ? this.props.checkToken() : this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={Home} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Route exact path="/logout" component={Home} />
          <Route path="/daw" component={InstrumentContainer} />
          <Route path="/" component={ErrorMessage} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  null,
  { checkToken }
)(withRouter(App));
