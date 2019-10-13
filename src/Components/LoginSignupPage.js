import React, { Component } from "react";
import { getUserFromLogin, createUser } from "../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import "../styles/Login.css";

class LoginSignupPage extends Component {
  state = {
    username: "",
    password: "",
    bio: "",
    avatar: "",
    clicked: this.props.history.location.pathname === "/login",
    invalid: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loginSubmitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.getUserFromLogin({ username, password });
  };

  clickHandler = () => {
    this.state.clicked
      ? this.props.history.push("/signup")
      : this.props.history.push("/login");
    this.setState({
      username: "",
      password: "",
      bio: "",
      avatar: "",
      clicked: !this.state.clicked
    });
  };

  signUpSubmitHandler = e => {
    e.preventDefault();
    const { username, password, avatar, bio } = this.state;
    return this.props.createUser({ username, password, avatar, bio });
  };

  render() {
    let { username, password, avatar, bio, clicked } = this.state;

    let {
      changeHandler,
      loginSubmitHandler,
      signUpSubmitHandler,
      clickHandler
    } = this;

    return (
      <div id="background">
        {this.props.user ? (
          <Redirect to="/profile" />
        ) : clicked ? (
          <Login
            password={password}
            changeHandler={changeHandler}
            submitHandler={loginSubmitHandler}
            clickHandler={clickHandler}
          />
        ) : (
          <SignUp
            username={username}
            password={password}
            avatar={avatar}
            bio={bio}
            changeHandler={changeHandler}
            submitHandler={signUpSubmitHandler}
            clickHandler={clickHandler}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.user.userInfo });

const mapDispatchToProps = dispatch => ({
  getUserFromLogin: state => dispatch(getUserFromLogin(state)),
  createUser: state => dispatch(createUser(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginSignupPage);
