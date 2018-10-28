import React, { Component } from 'react';
import Result from './Result'
import {Container}from 'semantic-ui-react'
import {Grid} from "semantic-ui-react"


class SearchResult extends Component {

  render() {
    console.log(this.props.searchResult)
    return (
      <Grid columns={3} padded='horizontally' className="Grid1">

        {this.props.searchResult.map((recipe,idx)=>{
          return <Result key={idx} {...recipe} />
        })}


    </Grid>
    );
  }

}

export default SearchResult;
