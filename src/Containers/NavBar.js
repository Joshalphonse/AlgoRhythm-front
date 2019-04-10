import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/userActions";

const NavBar = props => {
  console.log(props);
  return (
    <ul className="menubar" role="navigation">
      <Link to="/home">
        <img
          className="Logos"
          alt=""
          src={
            "https://cdn-images-1.medium.com/max/2600/1*8BCrOic8jIpo284ikA7ZYw.png"
          }
        />
      </Link>
      {props.user.id ? (
        <Link to="/daw">
          {" "}
          <li>Workstation</li>{" "}
        </Link>
      ) : null}

      <Link to="/signup">
        <li>Sign Up</li>
      </Link>
      <Link to="/login">
        <li>Log In</li>
      </Link>
      <li
        onClick={() => {
          localStorage.removeItem("token");
          props.history.push("/signup");
        }}
      >
        <button onClick={() => props.logOut()}>Logout</button>
      </li>
    </ul>
  );
};
const mapStateToProps = state => {
  return { user: state.userReducer.user };
};
export default connect(
  mapStateToProps,
  { logOut }
)(withRouter(NavBar));
