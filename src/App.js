import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <div className="App">

        <Home />
      </div>
    );
  }
}

export default App;
