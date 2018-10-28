import React, { Component } from 'react';
import Search from '../components/Search'
import SearchResult from '../components/SearchResult'
import RecipeList from '../components/RecipeList'
import FormComponent from '../components/FormComponent'
import RecipeDetail from '../components/RecipeDetail'
import {connect} from 'react-redux';
import Navbar from '../components/Navbar'
import {createUser} from '../actions/SignUp';
import {Container} from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'



class MainPage extends Component {

  state={
    showDetail: false,
    targetRecipe: {},
    searchBar:'',
    searchResult: [],
    userRecipes: [],
    userCollections: [],
    showForm: true
  }




  handleChange=(input) => {
    this.setState({
      searchBar:input
    })
  }

  handleSubmit=(event) => {
    event.preventDefault()
    fetch(`https://api.edamam.com/search?q=${this.state.searchBar}&app_id=a4e59699&app_key=24b18ce7a1e475a71220602f373751f4&from=0&to=20`,{
      headers:{
       "Access-Control-Allow-Origin":"*"
     }
    })
    .then(response=>response.json())
    .then(recipeData =>{ this.setState({
      searchResult: recipeData.hits
    })
    })
  }

  handleLogOut =(event) => {
    this.props.createUser(null)
    this.props.history.push("/")
    console.log(this.props.currentUserId)
  }

  handleProfile=() => {
    this.props.history.push("/profile")
  }

  handleMainPage =() => {
    this.props.history.push("/mainpage")
  }


  render() {
    console.log(this.props.currentUser);

    console.log(this.state.searchResult);
    return (
      <React.Fragment>
        <Navbar handleLogOut={this.handleLogOut} handleProfile={this.handleProfile} handleMainPage={this.handleMainPage}/>
        <div className="main-page-search">
        <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <SearchResult searchResult={this.state.searchResult} handleFavorite={this.handleFavorite}/>
        </div>
    </React.Fragment>

    );
  }

}

export default connect (state => ({currentUser: state.currentUser}),{createUser}) (MainPage);


//

// <FormDetail />
