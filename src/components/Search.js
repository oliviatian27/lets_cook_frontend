import React, { Component } from 'react';
import {Form} from 'semantic-ui-react'

class Search extends Component {
  handleChange=(event) => {
    this.props.handleChange(event.target.value)
  }

  handleSubmit=(event) => {

    this.props.handleSubmit(event)
  }

  render() {
    // console.log(event)
    return (
      <div>
        <h1 className="banner">Let's Cook</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="search-sides">
          <input onChange={this.handleChange}type="text" placeholder="Search.."></input>
          <Form.Input type="submit"value="Submit"/>
         </Form.Group>
        </Form>
      </div>
    );
  }

}

export default Search;
