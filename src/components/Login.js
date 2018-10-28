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
import withStyles from "@material-ui/core/styles/withStyles";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "../actions/SignUp";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleClick = () => this.setState({ active: !this.state.active });

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch("https://letscook-api.herokuapp.com/users")
      .then(response => response.json())
      .then(allUsers => {
        const user = allUsers.find(user => {
          return (
            user.email === this.state.email &&
            user.password === this.state.password
          );
        });
        this.props.createUser(user);
      })
      .then(() => this.props.history.push("/mainpage"));
  };

  render() {
    const { classes } = this.props;
    const { active } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className="background">
          <form className="login" onSubmit={this.handleSubmit}>
            <h1 className="log">Login </h1>
            <FormControl margin="normal" required fullWidth>
              <InputLabel
                htmlFor="email"
                style={{
                  color: "white"
                }}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="white" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
              active={active}
              style={{
                color: "white",
                paddingLeft: 100,
                paddingRight: 100,
                backgroundColor: active ? "#e55b00" : "#16203d"
              }}
            >
            Log In
            </Button>
          </form>
        </main>
      </React.Fragment>
    );
  }
}

export default connect(null, {createUser}) (Login);

// onClick={this.handleClick}
