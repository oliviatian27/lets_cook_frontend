import React, { Component } from 'react';
import Background from '../img/3.jpg'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import "../index.css"

const sectionStyle = {
 width: "100%",
 height: "100vh",
 position: "absolute",
 backgroundPosition: "center",
 backgroundSize: "cover",
 backgroundImage: `url(${Background})`
};

class Home extends Component {

  render() {

    return (
      <React.Fragment>
        <div style={sectionStyle}>
          <h1 className="title" >Let's Cook</h1>
          <NavLink to="/login" > <Button className="logInButton" color='orange' style={{color: "white", textDecoration: "none", paddingLeft: 35, paddingRight: 35}}> Log In </Button></NavLink>
          <NavLink to="/signup" > <Button className="signUpButton" color='orange' style={{color: "white", textDecoration: "none", paddingLeft: 35, paddingRight: 35}}> Sign Up </Button></NavLink>
        </div>
      </React.Fragment>

    );
  }

}

export default Home;
