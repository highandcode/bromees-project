import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, BrowserRouter as Router  } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentDidUpdate(prev){
    if(this.props.user !== this.state.currentUser) this.setState({ currentUser: this.props.user})
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
      <div>

      {currentUser && <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              logo
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

           
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Info
                  </Link>
                </li>

              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>}
      </div>
      <div className="container mt-3">
            <Routes>
              <Route exact path={"/"} element={<Navigate replace to={currentUser ? "/home" : "/login"} />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/login"} element={<Login/>} />
              <Route path={"/register"} element={<Register/>} />
              <Route path={"/profile"} element={<Profile/>} />
            </Routes>
          </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.users;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);