import React, { Component } from "react";

import UserService from "../services/user.service";
import { connect } from "react-redux";
import { Navigate } from "react-router";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  const { isLoggedIn } = state.users;
  return {
    isLoggedIn
  }
}

export default connect(mapStateToProps)(Home);