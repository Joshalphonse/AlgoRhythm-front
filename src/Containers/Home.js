import React from "react";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";
import { Link, withRouter } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="hello">Hello, {this.props.user.username}</div>
        <h1 className="hello">Welcome To AlgoRhythm</h1>

        <Link to="/daw" className="workstation">
          <button className="button-btn">Navigate To WorkStation</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.userReducer);
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Home);
