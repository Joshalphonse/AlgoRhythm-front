import React from "react";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>Hello, {this.props.user.username}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.userReducer);
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Home);
