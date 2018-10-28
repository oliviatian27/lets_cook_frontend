

import React, { Component } from "react";
import PropTypes from "prop-types";
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import withStyles from "@material-ui/core/styles/withStyles";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../actions/SignUp";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: ""
  };

  handleClick = () => this.setState({ active: !this.state.active });

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch("https://letscook-api.herokuapp.com/users", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "content-type": "Application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(response => response.json())
      .then(newUser => this.props.createUser(newUser))
      .then(() => this.props.history.push("/mainpage"));
  };

  render() {
    
    const { classes } = this.props;
    const { active } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className="background">
          <form onSubmit={this.handleSubmit} className="login">
            <h1 className="log">SignUp </h1>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                htmlFor="username"
                style={{
                  color: "white"
                }}
              >
                Username
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                style={{
                  color: "white"
                }}
                htmlFor="email"
              >
                Email Address
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                style={{
                  color: "white"
                }}
                htmlFor="password"
              >
                Password
              </InputLabel>
              <Input
                onChange={this.handleOnChange}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                className="color"
                style={{
                  color: "white"
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              active={active}
              onClick={this.handleClick}
              style={{
                paddingLeft: 100,
                paddingRight: 100,
                backgroundColor: active ? "#e55b00" : "#16203d"
              }}
            >
              <NavLink
                style={{
                  color: "white"
                }}
                to="/mainpage"
              >
                SignUp
              </NavLink>
            </Button>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { createUser }
)(SignUp);
