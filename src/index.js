import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './containers/Home'
import MainPage from './containers/MainPage'
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore } from 'redux'
import todoApp from './reducers/todoApp'
import Profile from './components/Profile'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/profile" component={Profile} />
      </React.Fragment>
    </Router>
  </Provider>
)

const store = createStore(todoApp)
Root.propTypes = {
  store: PropTypes.object.isRequired
}
ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
)
serviceWorker.unregister()
