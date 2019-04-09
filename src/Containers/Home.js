import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    return <div>Hello, {this.props.user.username}</div>;
  }
}

const mapStateToProps = state => {
  console.log(state.userReducer);
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(Home);
