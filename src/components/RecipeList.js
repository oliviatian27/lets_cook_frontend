import React, { Component } from 'react';
import {Button,Image,List} from 'semantic-ui-react';
import "../index.css"
import {Container} from 'semantic-ui-react'
import Recipe from './Recipe'

class RecipeList extends Component {

  state = {
    showMyRecipes: true
  }

  handleMyRecipes = (event) => {
    this.setState({
      showMyRecipes: true
    })
  }

  handleMyCollections = (event) => {
    this.setState({
      showMyRecipes: false
    })
  }

  handleShowDetail = (recipe) => {
    // console.log(recipe);
    this.props.handleShowDetail(recipe)
  }

  handleDelete = (recipe) => {
    // console.log(recipe);
    this.props.handleDelete(recipe)
  }

  handleShowForm = (event) => {
    this.props.handleShowForm(event)
  }

  render(){
    const allRecipes=this.state.showMyRecipes ? this.props.userRecipes : this.props.userCollections
    return (
      <div>
        <div className="recipe-button-container">
          <Button className="myRecipeBtn"  onClick={this.handleMyRecipes}>My Recipes</Button>
          <Button className="myFavBtn" onClick={this.handleMyCollections}>My Favorites</Button>
          <Button className="myFormBtn" onClick={this.handleShowForm}>Create Recipe</Button>
        </div>

        <div className="recipeList-container">
          <List divided verticalAlign='middle'>
            {allRecipes.map(recipe =><Recipe recipe={recipe} key={recipe.id} handleShowDetail={this.handleShowDetail}  handleDelete={this.handleDelete}/>)}
          </List>
        </div>
      </div>
    );
  }
}

export default RecipeList;
