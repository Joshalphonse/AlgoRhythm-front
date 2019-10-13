import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/userActions";

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SvgIcon from "@material-ui/core/SvgIcon";

import compose from "recompose/compose";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 100
  },
  hide: {
    display: "none",
    transform: "translateY(-110%)",
    transition: "transform .5s"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s"
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NavBar extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
              <img
                className="menuicons"
                atl=""
                src={"menu-three-horizontal-lines-symbol.svg"}
              />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              AlgoRhythm Digital Audio Workstation
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <img
                className="menuicons"
                atl=""
                src={"double-left-chevron.svg"}
              />
            </IconButton>
          </div>
          <Divider />
          <List>
            <li className="menubar" role="navigation">
              <Link to="/home">
                <img
                  className="Logos"
                  alt=""
                  src={
                    "http://www.algorhythm.tv/wp-content/uploads/2018/01/Logo.png"
                  }
                />
              </Link>
              {this.props.user.id ? (
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
                  this.props.history.push("/login");
                }}
              >
                <button onClick={() => this.props.logOut()}>Logout</button>
              </li>
            </li>
          </List>
          <Divider />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { user: state.userReducer.user };
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { logOut }
  )
)(withRouter(NavBar));
