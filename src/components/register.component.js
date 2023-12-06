import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import ErrorBoundary from "./ErrorBoundry";
import task from "./task.png"
import { Link, useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { register } from "../actions/auth";
import { clearMessage } from "../reducers/message";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};



class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordConfirm: "",
      successful: false
    };
  }

  onChangeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillUnmount(){
    const { dispatch } = this.props;
    dispatch(clearMessage());
  }




  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.username, this.state.email, this.state.password, this.state.firstName, this.state.lastName)
        )
        .then((response) => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;
    const confirmpass = (value) => {
      let value2 = this.state?.password;
      if (value !== value2) {
        return (
          <div className="alert alert-danger" role="alert">
            The password do not match.
          </div>
        );
      }
    };
    return (
      <ErrorBoundary >
        <div className="row bg-white my-5 rounded">
          <div className="col-md-6 task_image">
            <div className="">

            </div>
            {/* <img src={task} className="task_image"/> */}

          </div>
          <div className="col-md-6 px-5 pb-5">
            <div className="d-flex justify-content-end pb-5 py-5">
              <Link to="/login">
                <button className="btn btn-outline-primary btn-md px-4">  Sign in</button>
              </Link>
            </div>
            <div className="pb-4">
              <h2 className="text-color"><strong>Explore & Experience</strong></h2>
              <p className="text-color"><strong>Get onto your most comfortable journey yet. ALl the way up</strong></p>
            </div>
            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-row pb-2">
                    <div className="form-group col-md-6">
                      <Input
                        type="text"
                        className="form-control"
                        name="firstName"
                        autoComplete="on"
                        placeHolder={"First Name"}
                        value={this.state.firstName}
                        onChange={this.onChangeInput}
                        validations={[required]}
                      />
                    </div>
                    <div className="form-group col-md-6">

                      <Input
                        type="text"
                        className="form-control col"
                        name="lastName"
                        autoComplete="on"
                        placeHolder={"Last Name"}
                        value={this.state.lastName}
                        onChange={this.onChangeInput}
                        validations={[required]}
                      />
                    </div>

                  </div>
                  <div className="form-group pb-2">
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      autoComplete="on"
                      placeHolder={"Email"}
                      value={this.state.email}
                      onChange={this.onChangeInput}
                      validations={[required, email]}
                    />
                  </div>
                  <div className="form-group pb-2">
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      autoComplete="on"
                      placeHolder={"Username"}
                      value={this.state.username}
                      onChange={this.onChangeInput}
                      validations={[required, vusername]}
                    />
                  </div>


                  <div className="form-group pb-2">
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      autoComplete="on"
                      placeHolder={"Password"}
                      value={this.state.password}
                      onChange={this.onChangeInput}
                      validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group pb-2">
                    <Input
                      type="password"
                      className="form-control"
                      name="passwordConfirm"
                      autoComplete="on"
                      placeHolder={"Confirm Password"}
                      value={this.state.passwordConfirm}
                      onChange={this.onChangeInput}
                      validations={[required, vpassword, confirmpass]}
                    />
                  </div>

                  <div className="form-group pt-2 ">
                    <button className="btn btn-primary btn-block mt-4 py-2">GET STARTED</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.messages;
  return {
    message,
    state
  };
}

export default connect(mapStateToProps)(Register);
